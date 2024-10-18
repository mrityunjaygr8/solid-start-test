import { A, Navigate } from "@solidjs/router";
import { ColumnDef } from "@tanstack/solid-table";
import { createResource } from "solid-js";
import { Button, buttonVariants } from "~/components/ui/button";
import { DataTable } from "~/components/ui/datatable";
import { useAuthContext } from "~/libs/AuthProvider";
import { usePocketbaseContext } from "~/libs/PocketbaseProvider";
import { FormItemTypeResponse } from "~/types/pocketbase-types";
import { IconLink } from "@tabler/icons-solidjs";
import { cn } from "~/libs/cn";
const columns: ColumnDef<FormItemTypeResponse>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: (props) => {
      return (
        <span class="flex">
          <A
            href={`/itemtypes/${props.row.original.id}`}
            class={cn(
              buttonVariants({ variant: "link", size: "smallIcon" }),
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

export default function ListFormItemType() {
  const client = usePocketbaseContext();
  const { user } = useAuthContext();
  if (user() == null || user() == undefined) {
    return <Navigate href={"/login"} />;
  }

  const [formItemTypes] = createResource(() =>
    client.collection("formItemType").getList<FormItemTypeResponse>(),
  );
  return (
    <div class="flex flex-col p-4">
      <h1>ListFormItemType</h1>

      <div>
        {formItemTypes.loading && "Loading"}
        {formItemTypes.error && "Error loading formItemTypes"}
        {formItemTypes() && (
          <>
            <DataTable columns={columns} data={() => formItemTypes()?.items} />
            <pre>{JSON.stringify(formItemTypes(), null, 2)}</pre>
          </>
        )}
      </div>
    </div>
  );
}
