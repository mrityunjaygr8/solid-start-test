import { Navigate } from "@solidjs/router";
import { createResource } from "solid-js";
import { useAuthContext } from "~/libs/AuthProvider";
import { usePocketbaseContext } from "~/libs/PocketbaseProvider";

export default function ListCampaigns() {
  const client = usePocketbaseContext();
  const { user } = useAuthContext();
  if (user() == null || user() == undefined) {
    return <Navigate href={"/login"} />;
  }

  const [campaigns] = createResource(() =>
    client.collection("campaign").getList(1, 20, {
      expand: "creator,template",
    }),
  );
  return (
    <div class="flex flex-col p-4">
      <h1>ListFormItemType</h1>

      <div>
        {campaigns.loading && "Loading"}
        {campaigns.error && "Error loading campaigns"}
        {campaigns() && <pre>{JSON.stringify(campaigns(), null, 2)}</pre>}
      </div>
    </div>
  );
}
