import {
  NumberField,
  NumberFieldDecrementTrigger,
  NumberFieldDescription,
  NumberFieldErrorMessage,
  NumberFieldGroup,
  NumberFieldIncrementTrigger,
  NumberFieldInput,
  NumberFieldLabel,
} from "~/components/ui/number-field.tsx";
import type { inputProps } from "~/components/formWrapper.tsx";

const Number = ({ questionText, description, value, setValue }: inputProps) => {
  return (
    <NumberField
      rawValue={value as number}
      onRawValueChange={(e: number) => (setValue as (e: number) => void)(e)}
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
