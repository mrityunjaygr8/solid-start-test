import { ColumnDef } from "@tanstack/solid-table";
import { createResource } from "solid-js";
import { DataTable } from "~/components/ui/datatable.tsx";
import { useAuthContext } from "~/libs/AuthProvider.ts";
import { usePocketbaseContext } from "~/libs/PocketbaseProvider.ts";
import { FormTemplateResponse } from "~/types/pocketbase-types.ts";
import { Button, buttonVariants } from "~/components/ui/button.tsx";
import { cn } from "~/libs/cn.ts";
import { A, Navigate } from "@solidjs/router";
import { IconArrowRight, IconLink } from "@tabler/icons-solidjs";

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
              buttonVariants({
                variant: "link",
                size: "smallIcon",
              }),
              "self-center",
              "mr-2"
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
    })
  );
  return (
    <div class="flex flex-col p-4">
      <div class=" p-3 flex items-center justify-between">
        {" "}
        <h1>ListFormItemType</h1>{" "}
        <Button
          class="border-blue-500"
          type="button"
          variant="outline"
          as="a"
          href="/templates/create_template"
        >
          Create Template <IconArrowRight></IconArrowRight>
        </Button>{" "}
      </div>

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
