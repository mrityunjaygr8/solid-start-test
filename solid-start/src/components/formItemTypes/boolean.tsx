import {
  TextField,
  TextFieldDescription,
  TextFieldLabel,
  TextFieldRoot,
} from "~/components/ui/textfield.tsx";
import type { inputProps } from "~/components/formWrapper.tsx";
import { Checkbox, CheckboxControl, CheckboxLabel } from "../ui/checkbox";
import { createSignal } from "solid-js";
import { Switch, SwitchControl, SwitchLabel, SwitchThumb } from "../ui/switch";

const Boolean = ({
  description,
  questionText,
  value,
  setValue,
}: inputProps) => {
  console.log(value);
  const [checked, setChecked] = createSignal(value);
  return (
    // <Checkbox
    //   checked={checked() as unknown as boolean}
    //   onChange={(v) => {
    //     setValue(v), setChecked(v);
    //   }}
    //   class="flex items-center space-x-2"
    // >
    //   <CheckboxLabel>{questionText}</CheckboxLabel>
    //   <CheckboxControl />
    //   <TextFieldDescription>{description}</TextFieldDescription>
    // </Checkbox>
    <Switch
      checked={checked() as unknown as boolean}
      onChange={(v) => {
        setValue(v), setChecked(v);
      }}
      class=" mt-4 mb-3 flex flex-col space-x-2"
    >
      <SwitchLabel class="mb-4 align-bottom items-center">
        {questionText}
      </SwitchLabel>
      <div style={{ display: "flex", "align-items": "center" }}>
        <span class="mr-2 ">false</span>
        <SwitchControl>
          <SwitchThumb />
        </SwitchControl>
        <span class="ml-2">true</span>
      </div>
    </Switch>
  );
};

export default Boolean;
