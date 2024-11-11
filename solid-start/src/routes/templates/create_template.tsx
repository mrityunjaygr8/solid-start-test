import { createEffect, createResource, createSignal, For } from "solid-js";
import {
  TextField,
  TextFieldDescription,
  TextFieldLabel,
  TextFieldRoot,
} from "~/components/ui/textfield.tsx";
import { Button } from "~/components/ui/button.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { usePocketbaseContext } from "~/libs/PocketbaseProvider";
import {
  Collections,
  FormItemQuestionRecord,
  FormItemQuestionResponse,
  SubmissionsResponse,
  UsersRecord,
  UsersResponse,
} from "~/types/pocketbase-types";
import { toast } from "solid-sonner";
import { useAuthContext } from "~/libs/AuthProvider";
import { IconCheck, IconCross, IconX } from "@tabler/icons-solidjs";
export default function create_template() {
  const { user } = useAuthContext();
  const [name, setName] = createSignal("");
  const [questionText, setQuestionText] = createSignal("");
  const [description, setDescription] = createSignal("");
  const [questionType, setQuestionType] = createSignal("short-text");

  const [questionsOptions, setQuestionsOptions] = createSignal<
    { value: string; label: string }[]
  >([] as { value: string; label: string }[]);
  const [values, setValues] = createSignal<{ value: string; label: string }[]>(
    []
  );

  const client = usePocketbaseContext();

  const [formItemQuestions] = createResource(() =>
    client.collection("formItemQuestion").getList<FormItemQuestionResponse>()
  );

  createEffect(() => {
    if (formItemQuestions() && !formItemQuestions.loading) {
      const idNames = formItemQuestions().items.map(
        (item: FormItemQuestionRecord) => ({
          value: item.id,
          label: item.questionText,
        })
      );
      setQuestionsOptions(idNames);
    }
  });
  const handleSubmission = async () => {
    const questionsId = () => values()?.map((item: any) => item.value);
    const req = {
      name: name(),
      description: description(),
      creator: user().id,
      questions: questionsId(),
    };
    console.log(req);
    toast.promise(client.collection(Collections.FormTemplate).create(req), {
      loading: "Creating Template",
      success: (data: SubmissionsResponse) =>
        `Created Template, ID: ${data.id}`,
      error: "Error when creating Template",
    });
  };
  return (
    <div class="flex items-center justify-center h-full overflow-y-auto">
      <Card class="w-3/6">
        <CardHeader>
          <CardTitle>Create Template</CardTitle>
        </CardHeader>
        <CardContent>
          <form class="space-y-4" onSubmit={handleSubmission}>
            <TextFieldRoot class="w-full max-w-xs">
              <TextFieldLabel>Name</TextFieldLabel>
              <TextField
                placeholder="Enter Name"
                value={name()}
                onChange={(e: Event) =>
                  (setName as (e: string) => void)(
                    (e.target as HTMLInputElement).value
                  )
                }
              />
            </TextFieldRoot>
            <TextFieldRoot class="w-full max-w-xs">
              <TextFieldLabel>Enter Description</TextFieldLabel>
              <TextField
                value={description()}
                onInput={(e) => setDescription(e.currentTarget.value)}
                placeholder="Enter Description"
              />
            </TextFieldRoot>

            <Select<{ value: string; label: string }>
              multiple
              optionValue={(option) =>
                (option as unknown as { value: string; label: string }).value
              }
              optionTextValue={(option) =>
                (option as unknown as { value: string; label: string }).label
              }
              class="w-full max-w-xs"
              placeholder="Select Questions"
              value={values() as unknown as { value: string; label: string }[]}
              onChange={setValues}
              options={questionsOptions()}
              itemComponent={(props) => (
                <SelectItem item={props.item}>
                  {props.item.rawValue.label}
                </SelectItem>
              )}
            >
              <Select.Label>Select Questions</Select.Label>
              <SelectTrigger
                class="w-full max-w-xs min-h-[40px] !h-auto w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background transition-shadow placeholder:text-muted-foreground focus:outline-none focus-visible:ring-[1.5px] focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-between min-h-40px "
                aria-label="Fruits"
                as="div"
              >
                <Select.Value<{ value: string; label: string }> class="w-full">
                  {(state) => (
                    <div class=" flex items-center gap-2 flex-grow text-ellipsis py-1">
                      <span class="flex w-full justify-between items-center gap-2 flex-wrap">
                        <For each={state.selectedOptions()}>
                          {(option) => (
                            <span class="text-ellipsis  bg-zinc-100 dark:bg-zinc-700 text-sm px-2 py-0.5 rounded inline-flex items-center gap-x-2">
                              <span>{option.label}</span>
                              <button
                                class="rounded-full hover:bg-zinc-300 dark:hover:bg-zinc-600 p-1"
                                onClick={() => state.remove(option)}
                              >
                                <IconX size={10}></IconX>
                              </button>
                            </span>
                          )}
                        </For>
                      </span>
                      <button
                        class="ml-auto mr-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-600 p-1"
                        onPointerDown={(e) => e.stopPropagation()}
                        onClick={state.clear}
                      >
                        <IconX size={20}></IconX>
                      </button>
                    </div>
                  )}
                </Select.Value>
              </SelectTrigger>
              <SelectContent />
            </Select>
          </form>
        </CardContent>
        <CardFooter class="justify-end gap-4">
          <Button
            class="border-red-500"
            type="button"
            variant="outline"
            as="a"
            href="/templates"
          >
            Cancel
          </Button>
          <Button type="submit" onClick={handleSubmission}>
            Submit
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
