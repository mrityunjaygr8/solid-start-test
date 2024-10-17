import { Navigate } from "@solidjs/router";
import { createResource } from "solid-js";
import { useAuthContext } from "~/libs/AuthProvider";
import { usePocketbaseContext } from "~/libs/PocketbaseProvider";

export default function ListFormItemQuestion() {
  const client = usePocketbaseContext();
  const { user } = useAuthContext();
  if (user() == null || user() == undefined) {
    return <Navigate href={"/login"} />;
  }

  const [formItemQuestions] = createResource(() =>
    client.collection("formItemQuestion").getList(),
  );
  return (
    <div class="flex flex-col p-4">
      <h1>ListFormItemType</h1>

      <div>
        {formItemQuestions.loading && "Loading"}
        {formItemQuestions.error && "Error loading formItemQuestions"}
        {formItemQuestions() && (
          <pre>{JSON.stringify(formItemQuestions(), null, 2)}</pre>
        )}
      </div>
    </div>
  );
}
