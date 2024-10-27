import { Navigate } from "@solidjs/router";
import { ColumnDef } from "@tanstack/solid-table";
import { createResource } from "solid-js";
import { DataTable } from "~/components/ui/datatable.tsx";
import { useAuthContext } from "~/libs/AuthProvider.ts";
import { usePocketbaseContext } from "~/libs/PocketbaseProvider.ts";
import {
  Collections,
  type SubmissionsResponse,
} from "~/types/pocketbase-types.ts";

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

  const [submissions] = createResource(() =>
    client
      .collection(Collections.Submissions)
      .getList<SubmissionsResponse>(1, 20, {
        expand: "campaign,submitter",
      }),
  );
  return (
    <div class="flex flex-col p-4">
      <h1>List Submissions</h1>

      <div>
        {submissions.loading && "Loading"}
        {submissions.error && "Error loading submissions"}
        {submissions() && (
          <>
            <DataTable columns={columns} data={() => submissions()?.items} />
            <pre>{JSON.stringify(submissions(), null, 2)}</pre>
          </>
        )}
      </div>
    </div>
  );
}
