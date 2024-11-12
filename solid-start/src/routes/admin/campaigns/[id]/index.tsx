import { usePocketbaseContext } from "~/libs/PocketbaseProvider.ts";
import { useAuthContext } from "~/libs/AuthProvider.ts";
import { Navigate, useParams } from "@solidjs/router";
import { createResource, createEffect, on, createSignal } from "solid-js";
import { Collections } from "~/types/pocketbase-types.ts";
import type { Campaign } from "~/types/campaign.ts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card.tsx";
import type { SubmissionsResponse } from "~/types/pocketbase-types.ts";
import { ColumnDef } from "@tanstack/solid-table";
import { DataTable } from "~/components/ui/datatable.tsx";
import type { FormItemQuestion } from "~/types/formItemQuestion.ts";

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

  const [ready, setReady] = createSignal(false);
  const [campaignSubmissionColumns, setCampaignSubmissionColumns] =
    createSignal<ColumnDef<SubmissionsResponse>[]>([
      {
        accessorKey: "expand.submitter.name",
        header: "Submitter Name",
      },
    ]);
  const [campaignSubmission] = createResource(() =>
    client
      .collection(Collections.Submissions)
      .getList<SubmissionsResponse>(1, 20, {
        expand: "campaign,submitter",
        filter: client.filter("campaign = {:id}", { id: params.id }),
      }),
  );

  const [questions] = createResource(campaigns, () =>
    client.collection(Collections.FormItemQuestion).getFullList({
      filter: campaigns()
        ?.expand.template.questions.map((id: string) => `id="${id}"`)
        .join("||"),
    }),
  );

  createEffect(
    on(questions, () => {
      const question = questions();
      if (question) {
        setCampaignSubmissionColumns([
          ...campaignSubmissionColumns(),
          ...question.map((q: FormItemQuestion) => {
            return {
              accessorKey: `answers.${q.id}`,
              header: q.questionText,
            };
          }),
        ]);
        setReady(true);
      }
    }),
  );

  // createEffect(() => console.log(campaignSubmissionColumns()));

  return (
    <div class="flex flex-col p-4">
      <div>
        {campaigns.loading && "Loading"}
        {campaigns.error && "Error loading submissions"}
        {campaigns() && (
          <>
            <h1 class="text-4xl font-bold py-4">{campaigns().name} Details</h1>
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
              </CardContent>
            </Card>
            <div>
              {campaignSubmission.loading && "Loading"}
              {campaignSubmission.error && "Error loading campaign submissions"}
              {campaignSubmission() && ready() && (
                <>
                  <h1 class="text-4xl font-bold py-4">
                    {campaigns().name} Submissions
                  </h1>
                  <DataTable
                    columns={campaignSubmissionColumns()}
                    data={() => campaignSubmission().items}
                  />
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
