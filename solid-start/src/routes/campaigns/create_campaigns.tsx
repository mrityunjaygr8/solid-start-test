import { createSignal, For } from "solid-js";
import {
  TextField,
  TextFieldDescription,
  TextFieldLabel,
  TextFieldRoot,
} from "~/components/ui/textfield.tsx";
import { Button } from "~/components/ui/button.tsx";
import {
  DatePicker,
  DatePickerContent,
  DatePickerContext,
  DatePickerInput,
  DatePickerRangeText,
  DatePickerTable,
  DatePickerTableBody,
  DatePickerTableCell,
  DatePickerTableCellTrigger,
  DatePickerTableHead,
  DatePickerTableHeader,
  DatePickerTableRow,
  DatePickerView,
  DatePickerViewControl,
  DatePickerViewTrigger,
} from "~/components/ui/datepicker";
import { Portal } from "solid-js/web";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Button } from "@/components/ui/button";

export default function create_campaigns() {
  const [questionText, setQuestionText] = createSignal("");
  const [description, setDescription] = createSignal("");
  const [questionType, setQuestionType] = createSignal("short-text");

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    console.log({
      questionText: questionText(),
      description: description(),
      questionType: questionType(),
    });
    // Add form submission logic here
  };

  return (
    <div class="flex items-center justify-center h-full overflow-y-auto">
      <Card class="w-3/6">
        <CardHeader>
          <CardTitle>Create Campaign</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            class="space-y-4"
            onSubmit={handleSubmit}
            //   style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <TextFieldRoot class="w-full max-w-xs">
              <TextFieldLabel>Name</TextFieldLabel>
              <TextField
                placeholder="Enter Name"
                type="email"
                // value={value}
                // onChange={(e: Event) =>
                //   (setValue as (e: string) => void)(
                //     (e.target as HTMLInputElement).value,
                //   )
                // }
              />
            </TextFieldRoot>
            <TextFieldRoot class="w-full max-w-xs">
              <TextFieldLabel>Enter Description</TextFieldLabel>
              <TextField placeholder="Enter Description" type="email" />
            </TextFieldRoot>

            <Select
              class="w-full max-w-xs"
              placeholder="Select Template"
              options={["Template1", "Template2", "Template3", "Template4"]}
              itemComponent={(props) => (
                <SelectItem item={props.item}>{props.item.rawValue}</SelectItem>
              )}
            >
              <Select.Label>Select Template</Select.Label>
              <SelectTrigger>
                <SelectValue<string>>
                  {(state) => state.selectedOption()}
                </SelectValue>
              </SelectTrigger>
              <SelectContent />
            </Select>
            <Select
              class="w-full max-w-xs"
              placeholder="Select Users"
              options={["User1", "User2", "User3", "User4"]}
              itemComponent={(props) => (
                <SelectItem item={props.item}>{props.item.rawValue}</SelectItem>
              )}
            >
              <Select.Label>Select Users</Select.Label>
              <SelectTrigger>
                <SelectValue<string>>
                  {(state) => state.selectedOption()}
                </SelectValue>
              </SelectTrigger>
              <SelectContent />
            </Select>
            {/* <DatePicker>
              <DatePickerInput />
              <Portal>
                <DatePickerContent>
                  <DatePickerView view="day">
                    <DatePickerContext>
                      {(api) => (
                        <>
                          <DatePickerViewControl>
                            <DatePickerViewTrigger>
                              <DatePickerRangeText />
                            </DatePickerViewTrigger>
                          </DatePickerViewControl>
                          <DatePickerTable>
                            <DatePickerTableHead>
                              <DatePickerTableRow>
                                <For each={api().weekDays}>
                                  {(weekDay) => (
                                    <DatePickerTableHeader>
                                      {weekDay.short}
                                    </DatePickerTableHeader>
                                  )}
                                </For>
                              </DatePickerTableRow>
                            </DatePickerTableHead>
                            <DatePickerTableBody>
                              <For each={api().weeks}>
                                {(week) => (
                                  <DatePickerTableRow>
                                    <For each={week}>
                                      {(day) => (
                                        <DatePickerTableCell value={day}>
                                          <DatePickerTableCellTrigger>
                                            {day.day}
                                          </DatePickerTableCellTrigger>
                                        </DatePickerTableCell>
                                      )}
                                    </For>
                                  </DatePickerTableRow>
                                )}
                              </For>
                            </DatePickerTableBody>
                          </DatePickerTable>
                        </>
                      )}
                    </DatePickerContext>
                  </DatePickerView>
                  <DatePickerView view="month">
                    <DatePickerContext>
                      {(api) => (
                        <>
                          <DatePickerViewControl>
                            <DatePickerViewTrigger>
                              <DatePickerRangeText />
                            </DatePickerViewTrigger>
                          </DatePickerViewControl>
                          <DatePickerTable>
                            <DatePickerTableBody>
                              <For
                                each={api().getMonthsGrid({
                                  columns: 4,
                                  format: "short",
                                })}
                              >
                                {(months) => (
                                  <DatePickerTableRow>
                                    <For each={months}>
                                      {(month) => (
                                        <DatePickerTableCell
                                          value={month.value}
                                        >
                                          <DatePickerTableCellTrigger>
                                            {month.label}
                                          </DatePickerTableCellTrigger>
                                        </DatePickerTableCell>
                                      )}
                                    </For>
                                  </DatePickerTableRow>
                                )}
                              </For>
                            </DatePickerTableBody>
                          </DatePickerTable>
                        </>
                      )}
                    </DatePickerContext>
                  </DatePickerView>
                  <DatePickerView view="year">
                    <DatePickerContext>
                      {(api) => (
                        <>
                          <DatePickerViewControl>
                            <DatePickerViewTrigger>
                              <DatePickerRangeText />
                            </DatePickerViewTrigger>
                          </DatePickerViewControl>
                          <DatePickerTable>
                            <DatePickerTableBody>
                              <For
                                each={api().getYearsGrid({
                                  columns: 4,
                                })}
                              >
                                {(years) => (
                                  <DatePickerTableRow>
                                    <For each={years}>
                                      {(year) => (
                                        <DatePickerTableCell value={year.value}>
                                          <DatePickerTableCellTrigger>
                                            {year.label}
                                          </DatePickerTableCellTrigger>
                                        </DatePickerTableCell>
                                      )}
                                    </For>
                                  </DatePickerTableRow>
                                )}
                              </For>
                            </DatePickerTableBody>
                          </DatePickerTable>
                        </>
                      )}
                    </DatePickerContext>
                  </DatePickerView>
                </DatePickerContent>
              </Portal>
            </DatePicker> */}
          </form>
        </CardContent>
        <CardFooter class="justify-end gap-4">
          <Button type="button" variant="destructive">
            Cancel
          </Button>
          <Button
            type="submit"
            class="bg-lime-700 text-destructive-foreground shadow-sm hover:bg-lime-800/90"
          >
            Submit
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
