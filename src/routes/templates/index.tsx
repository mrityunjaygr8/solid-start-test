import { ColumnDef } from "@tanstack/solid-table";
import { createResource } from "solid-js";
import { DataTable } from "~/components/ui/datatable";
import { useAuthContext } from "~/libs/AuthProvider";
import { usePocketbaseContext } from "~/libs/PocketbaseProvider";
import { FormTemplateResponse } from "~/types/pocketbase-types";
import { buttonVariants } from "~/components/ui/button.tsx";
import { cn } from "~/libs/cn.ts";
import { A, Navigate } from "@solidjs/router";
import { IconLink } from "@tabler/icons-solidjs";

const columns: ColumnDef<FormTemplateResponse>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: (props) => {
      return (
        <span class="flex">
          <A
            href={`/templates/${props.row.original.id}`}
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
export default function ListFormTemplate() {
  const client = usePocketbaseContext();
  const { user } = useAuthContext();
  if (user() == null || user() == undefined) {
    return <Navigate href={"/login"} />;
  }

  const [formTemplates] = createResource(() =>
    client.collection("formTemplate").getList<FormTemplateResponse>(1, 20, {
      expand: "questions",
    }),
  );
  return (
    <div class="flex flex-col p-4">
      <h1>ListFormItemType</h1>

      <div>
        {formTemplates.loading && "Loading"}
        {formTemplates.error && "Error loading formTemplates"}
        {formTemplates() && (
          <>
            <DataTable columns={columns} data={() => formTemplates()?.items} />
            <pre>{JSON.stringify(formTemplates(), null, 2)}</pre>
          </>
        )}
      </div>
    </div>
  );
}
