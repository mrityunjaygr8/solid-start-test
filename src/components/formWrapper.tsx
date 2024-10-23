import type { FormTemplateResponse } from "~/types/pocketbase-types.ts";
import { Accessor, createMemo, For, Show } from "solid-js";
import { Dynamic } from "solid-js/web";

import { Button } from "~/components/ui/button.tsx";

const shortText = await import("~/components/formItemTypes/shortText.tsx");
const number = await import("~/components/formItemTypes/number.tsx");
const fieldInputs = {
  shortText: shortText,
  number: number,
};

interface Question {
  id: string;
  questionText: string;
  description: string;
  values: object;
  formItemName: string;
  formItemSchema: object;
}

interface QuestionDict {
  [id: string]: Question;
}

export default function FormWrapper({
  template,
}: {
  template: Accessor<FormTemplateResponse>;
}) {
  console.log(fieldInputs);
  const questions = createMemo<QuestionDict>(() =>
    template()
      // this will create an array of json objects
      .expand?.questions.map((e) => ({
        id: e.id,
        questionText: e.questionText,
        description: e.description,
        values: e.values["options"],
        formItemName: e.expand?.formItemType.name,
        formItemSchema: e.expand?.formItemType.schema["options"],
      }))
      // this will convert the array of json objects to a json object
      // where the key will be value in the child objects id field
      .reduce((acc, curr) => {
        acc[curr.id] = { ...curr };
        return acc;
      }, {}),
  );
  return (
    <>
      <Show when={questions()} fallback={<p>Loading....</p>}>
        <h1 class="text-4xl font-extrabold">{template().name}</h1>
        <h4 class="text-xl">{template().description}</h4>

        <form class="w-80 mt-4">
          <For each={template().questions}>
            {(questionID) => {
              const q = questions()[questionID];
              return (
                <>
                  <Dynamic
                    component={fieldInputs[q.formItemName].default}
                    questionText={q.questionText}
                    description={q.description}
                  />
                </>
              );
            }}
          </For>
          <Button class="mt-4">Submit</Button>
        </form>
      </Show>
    </>
  );
}
