import { Navigate, useParams } from "@solidjs/router";
import { createResource, Show } from "solid-js";
import { useAuthContext } from "~/libs/AuthProvider.ts";
import { usePocketbaseContext } from "~/libs/PocketbaseProvider.ts";
import { Collections } from "~/types/pocketbase-types.ts";
import FormWrapper from "~/components/formWrapper.tsx";
import type { Campaign } from "~/types/campaign.ts";

// Stuff to Show
// 1. Question ID
// 2. Question Text
// 3. Question Description
// 4. FormItemType
// 5. Question Values
// 6. FormItemType Schema
//
export default function DetailCampaign() {
  const { user } = useAuthContext();
  if (user() == null || user() == undefined) {
    return <Navigate href={"/login"} />;
  }

  const params = useParams();
  const client = usePocketbaseContext();
  const [detailCampaign] = createResource(() =>
    client.collection(Collections.Campaign).getOne<Campaign>(params.id, {
      expand: "template,template.questions,template.questions.formItemType",
    }),
  );

  return (
    <div class="flex flex-col p-4">
      {/* <pre>{JSON.stringify(detailCampaign(), null, 2)}</pre> */}
      <h1>Detail FormTemplate</h1>

      <div>
        <Show when={detailCampaign()} fallback={<p>Loading...</p>}>
          <>
            <FormWrapper campaign={detailCampaign()} userID={user().id} />
          </>
        </Show>
        <Show when={detailCampaign.error}>
          <p>Oopsie Poopsie</p>
        </Show>
      </div>
    </div>
  );
}
