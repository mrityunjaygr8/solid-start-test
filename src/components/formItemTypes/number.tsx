import {
  NumberField,
  NumberFieldDecrementTrigger,
  NumberFieldErrorMessage,
  NumberFieldGroup,
  NumberFieldIncrementTrigger,
  NumberFieldInput,
  NumberFieldLabel,
  NumberFieldDescription,
} from "~/components/ui/number-field";
import { createSignal } from "solid-js";

const Number = ({
  questionText,
  description,
}: {
  questionText: string;
  description: string;
}) => {
  const [value, setValue] = createSignal(1000);

  return (
    <NumberField
      rawValue={value()}
      onRawValueChange={setValue}
      validationState={value() >= 1000 ? "valid" : "invalid"}
      minValue={0}
    >
      <NumberFieldLabel>{questionText}</NumberFieldLabel>
      <NumberFieldGroup>
        <NumberFieldDecrementTrigger aria-label="Decrement" />
        <NumberFieldInput />
        <NumberFieldIncrementTrigger aria-label="Increment" />
      </NumberFieldGroup>
      <NumberFieldDescription>{description}</NumberFieldDescription>
      <NumberFieldErrorMessage>
        Min 1000 to send payment
      </NumberFieldErrorMessage>
    </NumberField>
  );
};

export default Number;
