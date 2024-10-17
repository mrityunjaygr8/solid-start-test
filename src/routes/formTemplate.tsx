import { Navigate } from "@solidjs/router";
import { createResource } from "solid-js";
import { useAuthContext } from "~/libs/AuthProvider";
import { usePocketbaseContext } from "~/libs/PocketbaseProvider";

export default function ListFormTemplate() {
  const client = usePocketbaseContext();
  const { user } = useAuthContext();
  if (user() == null || user() == undefined) {
    return <Navigate href={"/login"} />;
  }

  const [formTemplates] = createResource(() =>
    client.collection("formTemplate").getList(),
  );
  return (
    <div class="flex flex-col p-4">
      <h1>ListFormItemType</h1>

      <div>
        {formTemplates.loading && "Loading"}
        {formTemplates.error && "Error loading formTemplates"}
        {formTemplates() && (
          <pre>{JSON.stringify(formTemplates(), null, 2)}</pre>
        )}
      </div>
    </div>
  );
}
