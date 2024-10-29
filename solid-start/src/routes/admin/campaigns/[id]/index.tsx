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
        {campaigns() && (
          <>
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
                  <h4 class="text-xl font-semibold">Respondents</h4>
                  <For each={campaigns().respondents}>
                    {(respondent) => {
                      return <p>{respondents()[respondent]}</p>;
                    }}
                  </For>
                </div>
              </CardContent>
            </Card>
            <div>
              <h4 class="text-xl font-bold">Template</h4>
              <p>{campaigns().expand?.template.name}</p>
            </div>
            <pre>{JSON.stringify(respondents(), null, 2)}</pre>
            <pre>{JSON.stringify(campaigns(), null, 2)}</pre>
          </>
        )}
      </div>
    </div>
  );
}
