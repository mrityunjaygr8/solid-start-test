import { Navigate, A } from "@solidjs/router";
import { ColumnDef } from "@tanstack/solid-table";
import { createResource } from "solid-js";
import { DataTable } from "~/components/ui/datatable.tsx";
import { useAuthContext } from "~/libs/AuthProvider.ts";
import { usePocketbaseContext } from "~/libs/PocketbaseProvider.ts";
import { CampaignResponse } from "~/types/pocketbase-types.ts";
import { cn } from "~/libs/cn.ts";
import { buttonVariants } from "~/components/ui/button.tsx";
import { IconLink } from "@tabler/icons-solidjs";

const columns: ColumnDef<CampaignResponse>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: (props) => {
      return (
        <span class="flex">
          <A
            href={`/campaigns/${props.row.original.id}`}
            class={cn(
              buttonVariants({
                variant: "link",
                size: "smallIcon",
              }),
              "self-center",
              "mr-2",
            )}
          >
            <IconLink />
          </A>
          <span>{props.cell.getValue() as string}</span>
        </span>
      );
    },
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
          </>
        )}
      </div>
    </div>
  );
}
