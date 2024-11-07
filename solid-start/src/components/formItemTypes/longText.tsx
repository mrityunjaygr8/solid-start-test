import {
  TextField,
  TextFieldDescription,
  TextFieldLabel,
  TextFieldRoot,
} from "~/components/ui/textfield.tsx";
import type { inputProps } from "~/components/formWrapper.tsx";
import { TextArea } from "../ui/textarea";

const LongText = ({
  description,
  questionText,
  value,
  setValue,
}: inputProps) => {
  return (
    <TextFieldRoot class="w-full max-w-xs">
      <TextFieldLabel>{questionText}</TextFieldLabel>
      <TextArea
        type="input"
        value={value}
        onChange={(e: Event) =>
          (setValue as (e: string) => void)(
            (e.target as HTMLInputElement).value
          )
        }
      />
      <TextFieldDescription>{description}</TextFieldDescription>
    </TextFieldRoot>
  );
};

export default LongText;
