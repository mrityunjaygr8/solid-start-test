import { createSignal } from "solid-js";
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

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Button } from "@/components/ui/button";

export default function create_template() {
  const [questionText, setQuestionText] = createSignal("");
  const [description, setDescription] = createSignal("");
  const [questionType, setQuestionType] = createSignal("short-text");

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    console.log({
      questionText: questionText(),
      description: description(),
      questionType: questionType(),
    });
    // Add form submission logic here
  };

  return (
    <div class="flex items-center justify-center h-full overflow-y-auto">
      <Card class="w-3/6">
        <CardHeader>
          <CardTitle>Create Template</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            class="space-y-4"
            onSubmit={handleSubmit}
            //   style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <TextFieldRoot class="w-full max-w-xs">
              <TextFieldLabel>Name</TextFieldLabel>
              <TextField
                placeholder="Enter Name"
                type="email"
                // value={value}
                // onChange={(e: Event) =>
                //   (setValue as (e: string) => void)(
                //     (e.target as HTMLInputElement).value,
                //   )
                // }
              />
            </TextFieldRoot>
            <TextFieldRoot class="w-full max-w-xs">
              <TextFieldLabel>Enter Description</TextFieldLabel>
              <TextField placeholder="Enter Description" type="email" />
            </TextFieldRoot>

            <Select
              class="w-full max-w-xs"
              placeholder="Select Questions"
              options={["Question1", "Question2", "Question3", "Question4"]}
              itemComponent={(props) => (
                <SelectItem item={props.item}>{props.item.rawValue}</SelectItem>
              )}
            >
              <Select.Label>Select Questions</Select.Label>
              <SelectTrigger>
                <SelectValue<string>>
                  {(state) => state.selectedOption()}
                </SelectValue>
              </SelectTrigger>
              <SelectContent />
            </Select>
          </form>
        </CardContent>
        <CardFooter class="justify-end gap-4">
          <Button type="button" variant="destructive">
            Cancel
          </Button>
          <Button
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
