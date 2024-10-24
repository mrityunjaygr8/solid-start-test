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
      <TextField type="email" value={value} onChange={() => setValue} />
      <TextFieldDescription>{description}</TextFieldDescription>
    </TextFieldRoot>
  );
};

export default ShortText;
