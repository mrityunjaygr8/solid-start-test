import {
  TextField,
  TextFieldDescription,
  TextFieldLabel,
  TextFieldRoot,
} from "~/components/ui/textfield";

const ShortText = ({
  description,
  questionText,
}: {
  description: string;
  questionText: string;
}) => {
  return (
    <TextFieldRoot class="w-full max-w-xs">
      <TextFieldLabel>{questionText}</TextFieldLabel>
      <TextField type="email" />
      <TextFieldDescription>{description}</TextFieldDescription>
    </TextFieldRoot>
  );
};

export default ShortText;
