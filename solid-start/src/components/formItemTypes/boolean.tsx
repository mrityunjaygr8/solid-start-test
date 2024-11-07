import {
  TextField,
  TextFieldDescription,
  TextFieldLabel,
  TextFieldRoot,
} from "~/components/ui/textfield.tsx";
import type { inputProps } from "~/components/formWrapper.tsx";
import { Checkbox, CheckboxControl, CheckboxLabel } from "../ui/checkbox";

const Boolean = ({
  description,
  questionText,
  value,
  setValue,
}: inputProps) => {
  return (
    <Checkbox class="flex items-center space-x-2">
      <CheckboxLabel>{questionText}</CheckboxLabel>
      <CheckboxControl
        value={value}
        onChange={(e: Event) =>
          (setValue as (e: string) => void)(
            (e.target as HTMLInputElement).value
          )
        }
      />
      <TextFieldDescription>{description}</TextFieldDescription>
    </Checkbox>
  );
};

export default Boolean;
