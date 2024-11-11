import { Navigate, useParams } from "@solidjs/router";
import { ColumnDef } from "@tanstack/solid-table";
import { createResource } from "solid-js";
import { DataTable } from "~/components/ui/datatable.tsx";
import { useAuthContext } from "~/libs/AuthProvider.ts";
import { usePocketbaseContext } from "~/libs/PocketbaseProvider.ts";
import {
  Collections,
  type SubmissionsResponse,
} from "~/types/pocketbase-types.ts";
import type { Campaign } from "~/types/campaign.ts";

const columns: ColumnDef<SubmissionsResponse>[] = [
  {
    accessorKey: "expand.campaign.name",
    header: "Campaign Name",
  },
  {
    accessorKey: "expand.submitter.name",
    header: "Submitter Name",
  },
  {
    accessorKey: "id",
    header: "Submission ID",
  },
];
export default function ListSubmissions() {
  const client = usePocketbaseContext();
  const { user } = useAuthContext();

  if (user() == null || user() == undefined) {
    return <Navigate href={"/login"} />;
  }

  const params = useParams();
  const [submissions] = createResource(() =>
    client
      .collection(Collections.Submissions)
      .getList<SubmissionsResponse>(1, 20, {
        expand: "campaign,submitter",
        filter: client.filter("campaign = {:id} && submitter.id = {:userID}", {
          id: params.id,
          userID: user().id,
        }),
      }),
  );
  const [campaigns] = createResource(() =>
    client.collection(Collections.Campaign).getOne<Campaign>(params.id),
  );
  return (
    <div class="flex flex-col p-4">
      <div>
        {submissions.loading && campaigns.loading && "Loading"}
        {(submissions.error || campaigns.error) && "Error loading submissions"}
        {submissions() && campaigns() && (
          <>
            <h1 class="text-xl font-bold py-4">
              List Submissions for {campaigns().name}
            </h1>
            <DataTable columns={columns} data={() => submissions()?.items} />
            <pre>{JSON.stringify(submissions(), null, 2)}</pre>
          </>
        )}
      </div>
    </div>
  );
}
