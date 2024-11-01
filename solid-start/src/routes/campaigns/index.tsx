import { Navigate } from "@solidjs/router";
import { ColumnDef } from "@tanstack/solid-table";
import { createResource } from "solid-js";
import { DataTable } from "~/components/ui/datatable.tsx";
import { useAuthContext } from "~/libs/AuthProvider.ts";
import { usePocketbaseContext } from "~/libs/PocketbaseProvider.ts";
import { CampaignResponse } from "~/types/pocketbase-types.ts";
import { Button } from "~/components/ui/button.tsx";
import { IconLink, IconReportAnalytics } from "@tabler/icons-solidjs";

const columns: ColumnDef<CampaignResponse>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: (props) => {
      return (
        <Button
          variant="link"
          as="A"
          class="px-0"
          href={`/campaigns/${props.row.original.id}`}
        >
          <Button variant="ghost" size="smallIcon" class="mr-1">
            <IconLink />
          </Button>{" "}
          {props.cell.getValue() as string}
        </Button>
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
    header: "Submissions",
    cell: (props) => {
      return (
        <Button
          as="A"
          variant="link"
          class="px-0"
          href={`/campaigns/${props.row.original.id}/submissions`}
        >
          <Button variant="ghost" size="smallIcon" class="mr-1">
            <IconReportAnalytics />
          </Button>
          Submissions
        </Button>
      );
    },
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
      filter: client.filter("respondents ~ {:userID}", {
        userID: user().id,
      }),
    }),
  );
  return (
    <div class="flex flex-col p-4">
      <div>
        {campaigns.loading && "Loading"}
        {campaigns.error && "Error loading campaigns"}
        {campaigns() && (
          <>
            <div class="flex justify-between my-4">
              <h1 class="text-xl font-extrabold">Campains assigned to you</h1>
              <Button as="a" href="/admin/campaigns">
                Campains Created by you
              </Button>
            </div>
            <DataTable columns={columns} data={() => campaigns()?.items} />
          </>
        )}
      </div>
    </div>
  );
}
