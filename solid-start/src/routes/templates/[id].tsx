import { Navigate, useParams } from "@solidjs/router";
import { createResource } from "solid-js";
import { useAuthContext } from "~/libs/AuthProvider.ts";
import { usePocketbaseContext } from "~/libs/PocketbaseProvider.ts";
import { Collections } from "~/types/pocketbase-types.ts";

// Stuff to Show
// 1. Question ID
// 2. Question Text
// 3. Question Description
// 4. FormItemType
// 5. Question Values
// 6. FormItemType Schema

export default function DetailFormItemType() {
  const { user } = useAuthContext();
  if (user() == null || user() == undefined) {
    return <Navigate href={"/login"} />;
  }

  const params = useParams();
  const client = usePocketbaseContext();
  const [detailFormTemplate] = createResource(() =>
    client.collection(Collections.FormTemplate).getOne(params.id, {
      expand: "questions,questions.formItemType",
    }),
  );

  return (
    <div class="flex flex-col p-4">
      <h1>Detail FormTemplate</h1>
      <pre>{JSON.stringify(detailFormTemplate(), null, 2)}</pre>

      {/* <div> */}
      {/*   <Show when={detailFormTemplate()} fallback={<p>Loading...</p>}> */}
      {/*     <> */}
      {/*       <FormWrapper template={detailFormTemplate} /> */}
      {/*     </> */}
      {/*   </Show> */}
      {/*   <Show when={detailFormTemplate.error}> */}
      {/*     <p>Oopsie Poopsie</p> */}
      {/*   </Show> */}
      {/* </div> */}
    </div>
  );
}
