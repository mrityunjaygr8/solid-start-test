import { Navigate } from "@solidjs/router";
import { ColumnDef } from "@tanstack/solid-table";
import { createResource } from "solid-js";
import { DataTable } from "~/components/ui/datatable";
import { useAuthContext } from "~/libs/AuthProvider";
import { usePocketbaseContext } from "~/libs/PocketbaseProvider";
import {
  FormItemQuestionResponse,
  FormTemplateResponse,
} from "~/types/pocketbase-types";

const columns: ColumnDef<FormTemplateResponse>[] = [
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
export default function ListFormTemplate() {
  const client = usePocketbaseContext();
  const { user } = useAuthContext();
  if (user() == null || user() == undefined) {
    return <Navigate href={"/login"} />;
  }

  const [formTemplates] = createResource(() =>
    client.collection("formTemplate").getList<FormTemplateResponse>(),
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
