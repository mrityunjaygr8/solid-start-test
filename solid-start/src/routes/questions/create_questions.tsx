import { createEffect, createResource, createSignal, Show } from "solid-js";
import {
  TextField,
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
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { usePocketbaseContext } from "~/libs/PocketbaseProvider";
import { toast } from "solid-sonner";
import {
  NumberField,
  NumberFieldDecrementTrigger,
  NumberFieldGroup,
  NumberFieldIncrementTrigger,
  NumberFieldInput,
  NumberFieldLabel,
} from "~/components/ui/number-field";
import {
  Switch,
  SwitchControl,
  SwitchLabel,
  SwitchThumb,
} from "~/components/ui/switch";
import {
  Collections,
  FormItemTypeRecord,
  FormItemTypeResponse,
  type SubmissionsResponse,
} from "~/types/pocketbase-types";

export default function CreateQuestions() {
  const client = usePocketbaseContext();

  const [questionText, setQuestionText] = createSignal("");
  const [description, setDescription] = createSignal("");
  const [questionType, setQuestionType] = createSignal("");
  const [required, setRequired] = createSignal(false);
  const [minValue, setMinValue] = createSignal(0);
  const [maxValue, setMaxValue] = createSignal(0);
  const [selectQuestionTypeOptions, setSelectQuestionTypeOptions] =
    createSignal<string[]>([]);

  const [formItemTypes] = createResource(() =>
    client.collection("formItemType").getList<FormItemTypeResponse>()
  );

  createEffect(() => {
    if (formItemTypes() && !formItemTypes.loading) {
      const idNames = formItemTypes().items.map(
        (item: FormItemTypeRecord) => item.name
      );
      setSelectQuestionTypeOptions(idNames);
    }
  });

  const handleSubmission = async () => {
    const findIdByName = () =>
      formItemTypes()?.items.find(
        (item: FormItemTypeRecord) => item.name === questionType()
      )?.id;

    const req = {
      questionText: questionText(),
      description: description(),
      formItemType: findIdByName(),
      values: {
        options: [
          { type: "required", value: required() },
          ...(questionType() === "shortText"
            ? [
                { type: "minLength", value: minValue() },
                { type: "maxLength", value: maxValue() },
              ]
            : questionType() === "number"
            ? [
                { type: "minValue", value: minValue() },
                { type: "maxValue", value: maxValue() },
              ]
            : []),
        ],
      },
    };
    console.log(req);
    toast.promise(client.collection(Collections.FormItemQuestion).create(req), {
      loading: "Creating Question",
      success: (data: SubmissionsResponse) =>
        `Created Submission, ID: ${data.id}`,
      error: "Error when creating submission",
    });
  };
  console.log(questionType());
  return (
    <div class="flex items-center justify-center h-full overflow-y-auto">
      <Card class="w-3/6">
        <CardHeader>
          <CardTitle>Create Question</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            class="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmission();
            }}
          >
            <TextFieldRoot class="w-full max-w-xs">
              <TextFieldLabel>Question</TextFieldLabel>
              <TextField
                placeholder="Enter Question"
                value={questionText()}
                onInput={(e) => setQuestionText(e.currentTarget.value)}
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
            <Switch
              checked={required()}
              onChange={() => setRequired(!required())}
              class="flex items-center space-x-2"
            >
              <SwitchLabel class="text-sm font-medium leading-none">
                Required*
              </SwitchLabel>
              <SwitchControl>
                <SwitchThumb />
              </SwitchControl>
            </Switch>

            <Select
              class="w-full max-w-xs"
              placeholder="Select Value"
              onChange={(value) => setQuestionType(value || "")}
              options={selectQuestionTypeOptions()}
              itemComponent={(props) => (
                <SelectItem item={props.item}>{props.item.rawValue}</SelectItem>
              )}
            >
              <Select.Label>Select Question Type</Select.Label>
              <SelectTrigger>
                <SelectValue<string>>
                  {(state) => state.selectedOption()}
                </SelectValue>
              </SelectTrigger>
              <SelectContent />
            </Select>

            <Show
              when={
                questionType() === "number" || questionType() === "shortText"
              }
            >
              <NumberField
                rawValue={minValue()}
                onRawValueChange={setMinValue}
                defaultValue={0}
                minValue={0}
              >
                <NumberFieldLabel>Enter Min Value</NumberFieldLabel>
                <NumberFieldGroup>
                  <NumberFieldDecrementTrigger aria-label="Decrement" />
                  <NumberFieldInput />
                  <NumberFieldIncrementTrigger aria-label="Increment" />
                </NumberFieldGroup>
              </NumberField>
              <NumberField
                rawValue={maxValue()}
                onRawValueChange={setMaxValue}
                defaultValue={0}
                minValue={0}
              >
                <NumberFieldLabel>Enter Max Value</NumberFieldLabel>
                <NumberFieldGroup>
                  <NumberFieldDecrementTrigger aria-label="Decrement" />
                  <NumberFieldInput />
                  <NumberFieldIncrementTrigger aria-label="Increment" />
                </NumberFieldGroup>
              </NumberField>
            </Show>
          </form>
        </CardContent>
        <CardFooter class="justify-end gap-4">
          <Button
            class="border-red-500"
            type="button"
            variant="outline"
            as="a"
            href="/questions"
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
