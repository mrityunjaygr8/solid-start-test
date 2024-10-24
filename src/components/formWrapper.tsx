import { createMemo, For, Show } from "solid-js";
import { Dynamic } from "solid-js/web";
import { createSignal } from "solid-js";
import { Button } from "~/components/ui/button.tsx";
import type { Campaign } from "~/types/campaign.ts";
import { usePocketbaseContext } from "~/libs/PocketbaseProvider.ts";
import { Collections } from "~/types/pocketbase-types.ts";

const shortText = await import("~/components/formItemTypes/shortText.tsx");
const number = await import("~/components/formItemTypes/number.tsx");
const fieldInputs = {
  shortText: shortText,
  number: number,
};

interface inputProps {
  value: string | number;
  setValue: (e: InputEvent) => void;
  questionText: string;
  description: string;
}

interface Question {
  id: string;
  questionText: string;
  description: string;
  values: object;
  formItemName: "number" | "shortText";
  formItemSchema: object;
}

interface QuestionDict {
  [id: string]: Question;
}

export default function FormWrapper({
  campaign,
  userID,
}: {
  campaign: Campaign;
  userID: string;
}) {
  const client = usePocketbaseContext();
  const questions = createMemo<QuestionDict>(() => {
    // this will create an array of json objects of type Question
    const t = campaign.expand?.template.expand?.questions?.map((e) => {
      const v = {
        id: e.id,
        questionText: e.questionText,
        description: e.description,
        values: e.values?.options,
        formItemName: e.expand?.formItemType.name,
        formItemSchema: e.expand?.formItemType.schema?.options,
      };
      return v;
    }) as Question[];
    // this will convert the array of questions to a QuestionDict
    // where the key will be value of question id field
    return t.reduce((acc: QuestionDict, curr: Question) => {
      acc[curr.id] = { ...curr };
      return acc;
    }, {} as QuestionDict);
  });
  const [formData, setFormData] = createSignal<Record<string, string | number>>(
    Object.values(questions()).reduce(
      (acc, field) => {
        acc[field.id] =
          field.formItemName === "shortText" ? "deafult-value" : 23;
        return acc;
      },
      {} as Record<string, string | number>,
    ),
  );

  const handleChange = (id: string, value: string | number): void => {
    setFormData({ ...formData(), [id]: value });
  };

  const handleSubmission = async () => {
    const req = {
      answers: formData(),
      campaign: campaign.id,
      submitter: userID,
    };
    const record = await client.collection(Collections.Submissions).create(req);
  };
  return (
    <>
      <Show when={questions()} fallback={<p>Loading....</p>}>
        <h1 class="text-4xl font-extrabold">
          {campaign.expand?.template.name}
        </h1>
        <h4 class="text-xl">{campaign.expand?.template.description}</h4>

        <form class="w-80 mt-4">
          <For each={campaign.expand?.template.questions}>
            {(questionID) => {
              const q = questions()[questionID];
              return (
                <>
                  <Dynamic
                    component={fieldInputs[q.formItemName].default}
                    questionText={q.questionText}
                    description={q.description}
                    value={formData()[q.id]}
                    setValue={(e: InputEvent) =>
                      handleChange(q.id, (e.target as HTMLInputElement).value)
                    }
                  />
                </>
              );
            }}
          </For>
          <Button onClick={handleSubmission} class="mt-4">
            Submit
          </Button>
        </form>
      </Show>
    </>
  );
}

export type { inputProps };
