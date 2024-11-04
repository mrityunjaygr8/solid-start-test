import { createSignal, Show } from "solid-js";
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
  type SubmissionsRecord,
  type SubmissionsResponse,
} from "~/types/pocketbase-types.ts";

export default function create_questions() {
  const [questionText, setQuestionText] = createSignal("");
  const [description, setDescription] = createSignal("");
  const [questionType, setQuestionType] = createSignal("shortText");
  const [required, setrequired] = createSignal(false);
  const [minValue, setMinValue] = createSignal(0);
  const [maxValue, setMaxValue] = createSignal(0);

  const client = usePocketbaseContext();

  const handleSubmission = async () => {
    const req = {
      questionText: questionText(),
      description: description(),
      questionType: questionType(),
      // values:[{name:"required",value:required(),}]
      values: {
        required: required(),
        minValue: minValue(),
        maxValue: maxValue(),
      },
    };

    toast.promise(client.collection(Collections.FormItemQuestion).create(req), {
      loading: "Creating Question",
      success: (data: SubmissionsResponse) =>
        `Created Submission, ID: ${data.id}`,
      error: "Error when creating submission",
    });
  };
  return (
    <div class="flex items-center justify-center h-full overflow-y-auto">
      <Card class="w-3/6">
        <CardHeader>
          <CardTitle>Create Question</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            class="space-y-4"
            onSubmit={() => handleSubmission()}
            //   style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <TextFieldRoot class="w-full max-w-xs">
              <TextFieldLabel>Question</TextFieldLabel>
              <TextField
                placeholder="Enter Question"
                type="email"
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
                type="email"
              />
            </TextFieldRoot>
            <Switch
              value={required()}
              onChange={() => setrequired(!required)}
              class="flex items-center space-x-2"
            >
              <SwitchLabel class="text-sm font-medium leading-none data-[disabled]:cursor-not-allowed data-[disabled]:opacity-70">
                Required*
              </SwitchLabel>
              <SwitchControl>
                <SwitchThumb />
              </SwitchControl>
            </Switch>

            <Select
              class="w-full max-w-xs"
              placeholder="Select Value"
              options={["shortText", "number"]}
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
            {/* <Show when={questionType() === "Number"}> */}
            <NumberField
              rawValue={minValue()}
              onRawValueChange={(e: number) =>
                (setMinValue as (e: number) => void)(e)
              }
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
              onRawValueChange={(e: number) =>
                (setMaxValue as (e: number) => void)(e)
              }
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
            {/* </Show> */}
          </form>
        </CardContent>
        <CardFooter class="justify-end gap-4">
          <Button type="button" variant="destructive">
            Cancel
          </Button>
          <Button
            onClick={() => handleSubmission()}
            type="submit"
            class="bg-lime-700 text-destructive-foreground shadow-sm hover:bg-lime-800/90"
          >
            Submit
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
