import { Navigate } from "@solidjs/router";
import { createResource } from "solid-js";
import { useAuthContext } from "~/libs/AuthProvider";
import { usePocketbaseContext } from "~/libs/PocketbaseProvider";

export default function ListFormItemType() {
  const client = usePocketbaseContext();
  const { user } = useAuthContext();
  if (user() == null || user() == undefined) {
    return <Navigate href={"/login"} />;
  }

  const [formItemTypes] = createResource(() =>
    client.collection("formItemType").getList(),
  );
  console.log(formItemTypes);
  return (
    <div class="flex flex-col p-4">
      <h1>ListFormItemType</h1>

      <div>
        {formItemTypes.loading && "Loading"}
        {formItemTypes.error && "Error loading formItemTypes"}
        {formItemTypes() && (
          <pre>{JSON.stringify(formItemTypes(), null, 2)}</pre>
        )}
      </div>
    </div>
  );
}
