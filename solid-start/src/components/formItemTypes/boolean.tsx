import {
  TextField,
  TextFieldDescription,
  TextFieldLabel,
  TextFieldRoot,
} from "~/components/ui/textfield.tsx";
import type { inputProps } from "~/components/formWrapper.tsx";
import { Checkbox, CheckboxControl, CheckboxLabel } from "../ui/checkbox";
import { createSignal } from "solid-js";

const Boolean = ({
  description,
  questionText,
  value,
  setValue,
}: inputProps) => {
  console.log(value);
  const [checked, setChecked] = createSignal(value);
  return (
    <Checkbox
      checked={checked() as unknown as boolean}
      onChange={(v) => {
        setValue(v), setChecked(v);
      }}
      class="flex items-center space-x-2"
    >
      <CheckboxLabel>{questionText}</CheckboxLabel>
      <CheckboxControl />
      <TextFieldDescription>{description}</TextFieldDescription>
    </Checkbox>
  );
};

export default Boolean;
