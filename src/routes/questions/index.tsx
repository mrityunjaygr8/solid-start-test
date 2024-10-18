import { Navigate } from "@solidjs/router";
import { ColumnDef } from "@tanstack/solid-table";
import { createResource } from "solid-js";
import { DataTable } from "~/components/ui/datatable";
import { useAuthContext } from "~/libs/AuthProvider";
import { usePocketbaseContext } from "~/libs/PocketbaseProvider";
import { FormItemQuestionResponse } from "~/types/pocketbase-types";

const columns: ColumnDef<FormItemQuestionResponse>[] = [
  {
    accessorKey: "questionText",
    header: "Question Text",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    header: "Question Type",
    accessorKey: "expand.formItemType.name",
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
export default function ListFormItemQuestion() {
  const client = usePocketbaseContext();
  const { user } = useAuthContext();
  if (user() == null || user() == undefined) {
    return <Navigate href={"/login"} />;
  }

  const [formItemQuestions] = createResource(() =>
    client
      .collection("formItemQuestion")
      .getList<FormItemQuestionResponse>(1, 20, {
        expand: "formItemType",
      }),
  );
  return (
    <div class="flex flex-col p-4">
      <h1>ListFormItemType</h1>

      <div>
        {formItemQuestions.loading && "Loading"}
        {formItemQuestions.error && "Error loading formItemQuestions"}
        {formItemQuestions() && (
          <>
            <DataTable
              columns={columns}
              data={() => formItemQuestions()?.items}
            />
            <pre>{JSON.stringify(formItemQuestions(), null, 2)}</pre>
          </>
        )}
      </div>
    </div>
  );
}
