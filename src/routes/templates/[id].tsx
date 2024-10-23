import { Navigate, useParams } from "@solidjs/router";
import { createResource, Show } from "solid-js";
import { useAuthContext } from "~/libs/AuthProvider";
import { usePocketbaseContext } from "~/libs/PocketbaseProvider";
import { Collections } from "~/types/pocketbase-types";
import { createSignal } from "solid-js";
import type { FormTemplateResponse } from "../../types/pocketbase-types.ts";

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
  // const items = createSignal();
  const questions = () =>
    detailFormTemplate()
      ?.expand?.questions.map((e) => ({
        id: e.id,
        questionText: e.questionText,
        description: e.description,
        values: e.values["options"],
        formItemName: e.expand?.formItemType.name,
        formItemSchema: e.expand?.formItemType.schema["options"],
      }))
      .reduce((acc, curr) => {
        acc[curr.id] = { ...curr };
        return acc;
      }, {});

  return (
    <div class="flex flex-col p-4">
      <h1>Detail FormTemplate</h1>

      <div>
        <Show
          when={detailFormTemplate() && questions()}
          fallback={<p>Loading...</p>}
        >
          <>
            <h1 class="text-4xl font-extrabold">Full</h1>
            <pre>{JSON.stringify(detailFormTemplate(), null, 2)}</pre>
            <h1 class="text-4xl font-extrabold">Questions</h1>
            <pre>{JSON.stringify(questions(), null, 2)}</pre>
          </>
        </Show>
        <Show when={detailFormTemplate.error}>
          <p>Oopsie Poopsie</p>
        </Show>
      </div>
    </div>
  );
}
