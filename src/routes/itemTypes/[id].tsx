import { Navigate, useParams } from "@solidjs/router";
import { createResource } from "solid-js";
import { useAuthContext } from "~/libs/AuthProvider";
import { usePocketbaseContext } from "~/libs/PocketbaseProvider";
import { Collections } from "~/types/pocketbase-types";

export default function DetailFormItemType() {
  const { user } = useAuthContext();
  if (user() == null || user() == undefined) {
    return <Navigate href={"/login"} />;
  }

  const params = useParams();
  const client = usePocketbaseContext();
  const [detailFormItem] = createResource(() =>
    client.collection(Collections.FormItemType).getOne(params.id),
  );
  return (
    <div class="flex flex-col p-4">
      <h1>ListFormItemType</h1>

      <div>
        {detailFormItem.loading && "Loading"}
        {detailFormItem.error && "Error loading detailFormItem"}
        {detailFormItem() && (
          <>
            <pre>{JSON.stringify(detailFormItem(), null, 2)}</pre>
          </>
        )}
      </div>
    </div>
  );
}
