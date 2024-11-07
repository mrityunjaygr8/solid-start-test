import {
  TextField,
  TextFieldDescription,
  TextFieldLabel,
  TextFieldRoot,
} from "~/components/ui/textfield.tsx";
import type { inputProps } from "~/components/formWrapper.tsx";

const ShortText = ({
  description,
  questionText,
  value,
  setValue,
}: inputProps) => {
  return (
    <TextFieldRoot class="w-full max-w-xs">
      <TextFieldLabel>{questionText}</TextFieldLabel>
      <TextField
        type="input"
        value={value as unknown as string}
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

export default ShortText;
