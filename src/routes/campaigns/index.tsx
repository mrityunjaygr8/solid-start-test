import { Navigate } from "@solidjs/router";
import { ColumnDef } from "@tanstack/solid-table";
import { createResource } from "solid-js";
import { DataTable } from "~/components/ui/datatable";
import { useAuthContext } from "~/libs/AuthProvider";
import { usePocketbaseContext } from "~/libs/PocketbaseProvider";
import {
  CampaignResponse,
  FormTemplateResponse,
} from "~/types/pocketbase-types";

const columns: ColumnDef<CampaignResponse>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "created",
    header: "Created",
  },
  {
    accessorKey: "id",
    header: "ID",
  },
];
export default function ListCampaigns() {
  const client = usePocketbaseContext();
  const { user } = useAuthContext();
  if (user() == null || user() == undefined) {
    return <Navigate href={"/login"} />;
  }

  const [campaigns] = createResource(() =>
    client.collection("campaign").getList<CampaignResponse>(1, 20, {
      expand: "creator,template",
    }),
  );
  return (
    <div class="flex flex-col p-4">
      <div>
        {campaigns.loading && "Loading"}
        {campaigns.error && "Error loading campaigns"}
        {campaigns() && (
          <>
            <DataTable columns={columns} data={() => campaigns()?.items} />
            <pre>{JSON.stringify(campaigns(), null, 2)}</pre>
          </>
        )}
      </div>
    </div>
  );
}
