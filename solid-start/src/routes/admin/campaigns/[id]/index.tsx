import { usePocketbaseContext } from "~/libs/PocketbaseProvider.ts";
import { useAuthContext } from "~/libs/AuthProvider.ts";
import { Navigate, useParams } from "@solidjs/router";
import { createResource, For, createMemo } from "solid-js";
import { Collections } from "~/types/pocketbase-types.ts";
import type { Campaign } from "~/types/campaign.ts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card.tsx";
import type { UsersResponse } from "~/types/pocketbase-types.ts";
import { PB_SERVER } from "~/libs/pb.ts";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table.tsx";

export default function DetailCampaign() {
  const client = usePocketbaseContext();
  const { user } = useAuthContext();
  const params = useParams();

  if (user() == null || user() == undefined) {
    return <Navigate href={"/login"} />;
  }
  const [campaigns] = createResource(() =>
    client
      .collection(Collections.Campaign)
      .getOne<Campaign>(params.id, { expand: "template,respondents" }),
  );

  const [campaignSubmission] = createResource(async () => {
    const response = await fetch(
      `${PB_SERVER}/admin/campaigns/${params.id}/submissions`,
    );
    const j = await response.json();
    return j;
  });
  const respondents = createMemo(() => {
    if (campaigns()) {
      const temp = campaigns().expand.respondents.map((e: UsersResponse) => ({
        [e.id]: e.name,
      }));
      const flattened_temp = temp.reduce((acc: object, curr: object) => ({
        ...acc,
        ...curr,
      }));
      return flattened_temp;
    }
  });
  return (
    <div class="flex flex-col p-4">
      <div>
        {campaigns.loading && "Loading"}
        {campaigns.error && "Error loading submissions"}
        {campaigns() && campaignSubmission() && (
          <>
            {/* <pre>{JSON.stringify(campaignSubmission(), null, 2)}</pre> */}
            <h1 class="text-4xl font-bold py-4">
              List Submissions for {campaigns().name}
            </h1>
            <Card class="my-4">
              <CardHeader>
                <CardTitle class="text-xl font-semibold">
                  {campaigns().name}
                </CardTitle>
                <CardDescription>{campaigns().description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div class="flex my-4">
                  <div class="w-80">
                    <h4 class="text-xl font-semibold">Template</h4>
                    <p>{campaigns().expand?.template.name}</p>
                  </div>
                  <div class="w-80">
                    <h4 class="text-xl font-semibold">Deadline</h4>
                    <p>{campaigns().deadline}</p>
                  </div>
                </div>
                <div>
                  <h4 class="text-xl font-semibold">Submissions</h4>
                  <Table class="w-80">
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Submissions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <For each={campaignSubmission()}>
                        {(submission) => {
                          return (
                            <TableRow>
                              <TableCell>{submission.name}</TableCell>
                              <TableCell>{submission.count}</TableCell>
                            </TableRow>
                          );
                        }}
                      </For>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
