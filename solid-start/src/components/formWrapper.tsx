import { createMemo, For, Show } from "solid-js";
import { Dynamic } from "solid-js/web";
import { createSignal } from "solid-js";
import { Button } from "~/components/ui/button.tsx";
import type { Campaign } from "~/types/campaign.ts";
import { usePocketbaseContext } from "~/libs/PocketbaseProvider.ts";
import {
  Collections,
  type SubmissionsRecord,
  type SubmissionsResponse,
} from "~/types/pocketbase-types.ts";
import { toast } from "solid-sonner";

const shortText = await import("~/components/formItemTypes/shortText.tsx");
const number = await import("~/components/formItemTypes/number.tsx");
const longText = await import("~/components/formItemTypes/longText");
const boolean = await import("~/components/formItemTypes/boolean.tsx");
const select = await import("~/components/formItemTypes/selectType");

const fieldInputs = {
  shortText,
  number,
  longText,
  boolean: boolean,
  select,
};

interface inputProps {
  value: string | number | boolean;
  setValue: (e: string | number | boolean) => void;
  questionText: string;
  description: string;
  options?: string[];
}

interface Question {
  id: string;
  questionText: string;
  description: string;
  values: object | string[];
  formItemName: "number" | "shortText" | "longText" | "boolean" | "select";
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
    const t = campaign.expand?.template.expand?.questions?.map((e) => ({
      id: e.id,
      questionText: e.questionText,
      description: e.description,
      values: e.values?.options,
      formItemName: e.expand?.formItemType.name,
      formItemSchema: e.expand?.formItemType.schema?.options,
    })) as Question[];
    // this will convert the array of questions to a QuestionDict
    // where the key will be value of question id field
    return t.reduce((acc: QuestionDict, curr: Question) => {
      acc[curr.id] = { ...curr };
      return acc;
    }, {} as QuestionDict);
  });

  const [formData, setFormData] = createSignal<
    Record<string, string | number | boolean>
  >(
    Object.values(questions()).reduce((acc, field) => {
      acc[field.id] =
        field.formItemName === "shortText" || field.formItemName === "longText"
          ? ""
          : field.formItemName === "boolean"
          ? false
          : 0;
      return acc;
    }, {} as Record<string, string | number | boolean>)
  );

  const handleChange = (
    id: string,
    type: "shortText" | "number" | "longText" | "boolean" | "select"
  ): ((v: string | number | boolean) => void) => {
    return (value: string | number | boolean) => {
      setFormData({ ...formData(), [id]: value });
    };
  };

  const handleSubmission = async () => {
    const req = {
      answers: formData(),
      campaign: campaign.id,
      submitter: userID,
    };

    toast.promise(client.collection(Collections.Submissions).create(req), {
      loading: "Creating Submission",
      success: (data: SubmissionsResponse) =>
        `Created Submission, ID: ${data.id}`,
      error: "Error when creating submission",
    });
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
                <Dynamic
                  component={fieldInputs[q.formItemName].default}
                  questionText={q.questionText}
                  description={q.description}
                  value={formData()[q.id]}
                  setValue={handleChange(q.id, q.formItemName)}
                  options={q.values as unknown as string[]}
                />
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
