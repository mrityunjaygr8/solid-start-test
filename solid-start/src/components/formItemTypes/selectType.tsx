import type { inputProps } from "~/components/formWrapper.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const SelectType = ({
  description,
  questionText,
  value,
  setValue,
  options,
}: inputProps) => {
  return (
    //   <TextFieldRoot class="w-full max-w-xs">
    //     <TextFieldLabel>{questionText}</TextFieldLabel>
    //     <TextField
    //       type="input"
    //       value={value}
    //       onChange={(e: Event) =>
    //         (setValue as (e: string) => void)(
    //           (e.target as HTMLInputElement).value
    //         )
    //       }
    //     />
    //     <TextFieldDescription>{description}</TextFieldDescription>
    //   </TextFieldRoot>

    <Select
      class="w-full max-w-xs"
      placeholder="Select Value"
      onChange={(value) => setValue(value || "")}
      options={options!}
      itemComponent={(props) => (
        <SelectItem item={props.item}>{props.item.rawValue}</SelectItem>
      )}
    >
      <Select.Label>{questionText}</Select.Label>
      <SelectTrigger>
        <SelectValue<string>>{(state) => state.selectedOption()}</SelectValue>
      </SelectTrigger>
      <SelectContent />
    </Select>
  );
};

export default SelectType;
