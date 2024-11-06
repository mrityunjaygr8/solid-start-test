import {
  createEffect,
  createResource,
  createSignal,
  For,
  Index,
} from "solid-js";
import {
  TextField,
  TextFieldDescription,
  TextFieldLabel,
  TextFieldRoot,
} from "~/components/ui/textfield.tsx";
import { Button } from "~/components/ui/button.tsx";
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
import { usePocketbaseContext } from "~/libs/PocketbaseProvider";
import {
  Collections,
  FormItemQuestionRecord,
  FormItemQuestionResponse,
  FormTemplateRecord,
  SubmissionsResponse,
  UsersRecord,
  UsersResponse,
} from "~/types/pocketbase-types";
import { toast } from "solid-sonner";
import { useAuthContext } from "~/libs/AuthProvider";
import {
  DatePicker,
  DatePickerContent,
  DatePickerContext,
  DatePickerControl,
  DatePickerInput,
  DatePickerLabel,
  DatePickerPositioner,
  DatePickerRangeText,
  DatePickerTable,
  DatePickerTableBody,
  DatePickerTableCell,
  DatePickerTableCellTrigger,
  DatePickerTableHead,
  DatePickerTableHeader,
  DatePickerTableRow,
  DatePickerTrigger,
  DatePickerView,
  DatePickerViewControl,
  DatePickerViewTrigger,
} from "~/components/ui/datepicker";
import { Portal } from "solid-js/web";
import {
  NumberField,
  NumberFieldDecrementTrigger,
  NumberFieldGroup,
  NumberFieldIncrementTrigger,
  NumberFieldInput,
  NumberFieldLabel,
} from "~/components/ui/number-field";
import { createStore } from "solid-js/store";
import { IconX } from "@tabler/icons-solidjs";
// import { Select } from "@kobalte/core/select";
// import "./style.css";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Button } from "@/components/ui/button";

export default function create_template() {
  const { user } = useAuthContext();
  const [name, setName] = createSignal("");
  const [questionText, setQuestionText] = createSignal("");
  const [description, setDescription] = createSignal("");
  const [questionType, setQuestionType] = createSignal("short-text");
  const [deadlineStore, setDeadlineStore] = createStore({
    date: "",
    hour: 0,
    minute: 0,
  });
  const [userValue, setUserValue] = createSignal<
    { id: string; name: string }[]
  >([]);
  const [usersOptions, setUsersOptions] = createSignal<
    { id: string; name: string }[]
  >([]);
  const [templateOptions, setTemplateOptions] = createSignal<
    { value: string; label: string }[]
  >([]);
  const [Templatevalue, setTemplateValue] = createSignal<{
    value: string;
    label: string;
  }>({} as { value: string; label: string });

  const client = usePocketbaseContext();

  const [formItemTypes] = createResource(() =>
    client.collection("users").getList<UsersResponse>()
  );
  const [formTemplates] = createResource(() =>
    client.collection("formTemplate").getList<FormItemQuestionResponse>()
  );

  createEffect(() => {
    if (formItemTypes() && !formItemTypes.loading) {
      const idNames = formItemTypes().items.map((item: UsersRecord) => ({
        value: item.id,
        label: item.name,
      }));
      setUsersOptions(idNames);
    }
    if (formTemplates() && !formTemplates.loading) {
      const idNames = formTemplates().items.map((item: FormTemplateRecord) => ({
        value: item.id,
        label: item.name,
      }));
      setTemplateOptions(idNames);
    }
  });
  const handleSubmission = async () => {
    const usersId = () => userValue()?.map((item: any) => item.value);
    // const date = `${deadlineStore.date},${deadlineStore.hour},${deadlineStore.minute}`;
    const dateObject = new Date(
      `${deadlineStore.date}T${String(deadlineStore.hour).padStart(
        2,
        "0"
      )}:${String(deadlineStore.minute).padStart(2, "0")}:00.000Z`
    );

    const date = dateObject.toISOString();
    const req = {
      name: name(),
      description: description(),
      creator: user().id,
      template: Templatevalue().value,
      respondents: usersId(),
      deadline: date,
    };
    console.log(req);
    toast.promise(client.collection(Collections.Campaign).create(req), {
      loading: "Creating Campaign",
      success: (data: SubmissionsResponse) =>
        `Created Campaign, ID: ${data.id}`,
      error: "Error when creating Campaign",
    });
  };
  return (
    <div class="flex items-center justify-center h-full overflow-y-auto">
      <Card class="w-3/6">
        <CardHeader>
          <CardTitle>Create Campaigns</CardTitle>
        </CardHeader>
        <CardContent>
          <form class="space-y-4" onSubmit={handleSubmission}>
            <TextFieldRoot class="w-full max-w-xs">
              <TextFieldLabel>Name</TextFieldLabel>
              <TextField
                placeholder="Enter Name"
                type="email"
                value={name()}
                onChange={(e: Event) =>
                  (setName as (e: string) => void)(
                    (e.target as HTMLInputElement).value
                  )
                }
              />
            </TextFieldRoot>
            <TextFieldRoot class="w-full max-w-xs">
              <TextFieldLabel>Enter Description</TextFieldLabel>
              <TextField
                value={description()}
                onInput={(e) => setDescription(e.currentTarget.value)}
                placeholder="Enter Description"
              />
            </TextFieldRoot>
            <Select
              optionValue="value"
              optionTextValue="value"
              class="w-full max-w-xs"
              placeholder="Select Value"
              onChange={setTemplateValue}
              options={templateOptions()}
              itemComponent={(props) => (
                <SelectItem item={props.item}>
                  {props.item.rawValue.label}
                  {console.log(props.item)}
                </SelectItem>
              )}
            >
              <Select.Label>Select Template </Select.Label>
              <SelectTrigger>
                <SelectValue<string>>
                  {(state) => state.selectedOption().label}
                </SelectValue>
              </SelectTrigger>
              <SelectContent />
            </Select>
            <Select
              multiple
              optionValue={(option) =>
                (option as unknown as { value: string; label: string }).value
              } // Explicitly cast each option to resolve typing
              optionTextValue={(option) =>
                (option as unknown as { value: string; label: string }).label
              }
              class="w-full max-w-xs"
              placeholder="Select Users"
              value={
                userValue() as unknown as { value: string; label: string }[]
              }
              onChange={setUserValue}
              options={usersOptions()}
              itemComponent={(props) => (
                <SelectItem item={props.item}>
                  {props.item.rawValue.label}
                  {console.log(props.item)}
                </SelectItem>
              )}
            >
              <Select.Label>Select Users</Select.Label>
              <SelectTrigger
                class="w-full max-w-xs min-h-[40px] !h-auto w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background transition-shadow placeholder:text-muted-foreground focus:outline-none focus-visible:ring-[1.5px] focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-between min-h-40px "
                aria-label="Fruits"
                as="div"
              >
                <Select.Value class="w-full">
                  {(state) => (
                    <div class=" flex items-center gap-2 flex-grow text-ellipsis py-1">
                      <span class="flex w-full  items-center gap-2 flex-wrap">
                        <For each={state.selectedOptions()}>
                          {(option) => (
                            <span class="text-ellipsis  bg-zinc-100 dark:bg-zinc-700 text-sm px-2 py-0.5 rounded inline-flex items-center gap-x-2">
                              <span>{option.label}</span>
                              <button
                                class="rounded-full hover:bg-zinc-300 dark:hover:bg-zinc-600 p-1"
                                onClick={() => state.remove(option)}
                              >
                                <IconX size={10}></IconX>
                              </button>
                            </span>
                          )}
                        </For>
                      </span>
                      <button
                        class="ml-auto mr-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-600 p-1"
                        onPointerDown={(e) => e.stopPropagation()}
                        onClick={state.clear}
                      >
                        <IconX size={20}></IconX>
                      </button>
                    </div>
                  )}
                </Select.Value>
              </SelectTrigger>
              <SelectContent />
            </Select>

            <DatePicker
              onValueChange={(v) => {
                console.log(v), setDeadlineStore("date", v.valueAsString);
              }}
            >
              <DatePickerLabel>Set Deadline</DatePickerLabel>
              <div></div>
              <DatePickerControl>
                <DatePickerInput />
                {/* <div class="flex w-6/12"> */}
                <NumberField
                  onRawValueChange={(v) => {
                    console.log(v), setDeadlineStore("hour", v);
                  }}
                  // class="w-4/12"
                  rawValue={1}
                  defaultValue={0}
                  minValue={0}
                  maxValue={23}
                >
                  {/* <NumberFieldLabel>HR</NumberFieldLabel> */}
                  <NumberFieldGroup>
                    <NumberFieldDecrementTrigger aria-label="Decrement" />
                    <NumberFieldInput />
                    <NumberFieldIncrementTrigger aria-label="Increment" />
                  </NumberFieldGroup>
                </NumberField>
                <NumberField
                  // class="w-4/12"
                  rawValue={1}
                  onRawValueChange={(v) => {
                    console.log(v), setDeadlineStore("minute", v);
                  }}
                  defaultValue={0}
                  minValue={0}
                  maxValue={59}
                >
                  {/* <NumberFieldLabel>MIN</NumberFieldLabel> */}
                  <NumberFieldGroup>
                    <NumberFieldDecrementTrigger aria-label="Decrement" />
                    <NumberFieldInput />
                    <NumberFieldIncrementTrigger aria-label="Increment" />
                  </NumberFieldGroup>
                </NumberField>
                {/* </div> */}

                <DatePickerTrigger onChange={(v) => console.log(v)} />
              </DatePickerControl>
              <Portal>
                <DatePickerPositioner>
                  <DatePickerContent>
                    <DatePickerView view="day">
                      <DatePickerContext>
                        {(context) => (
                          <>
                            <DatePickerViewControl>
                              <DatePickerViewTrigger>
                                <DatePickerRangeText />
                              </DatePickerViewTrigger>
                            </DatePickerViewControl>
                            <DatePickerTable>
                              <DatePickerTableHead>
                                <DatePickerTableRow>
                                  <Index each={context().weekDays}>
                                    {(weekDay) => (
                                      <DatePickerTableHeader>
                                        {weekDay().short}
                                      </DatePickerTableHeader>
                                    )}
                                  </Index>
                                </DatePickerTableRow>
                              </DatePickerTableHead>
                              <DatePickerTableBody>
                                <Index each={context().weeks}>
                                  {(week) => (
                                    <DatePickerTableRow>
                                      <Index each={week()}>
                                        {(day) => (
                                          <DatePickerTableCell value={day()}>
                                            <DatePickerTableCellTrigger>
                                              {day().day}
                                            </DatePickerTableCellTrigger>
                                          </DatePickerTableCell>
                                        )}
                                      </Index>
                                    </DatePickerTableRow>
                                  )}
                                </Index>
                              </DatePickerTableBody>
                            </DatePickerTable>
                          </>
                        )}
                      </DatePickerContext>
                    </DatePickerView>
                    <DatePickerView view="month">
                      <DatePickerContext>
                        {(context) => (
                          <>
                            <DatePickerViewControl>
                              <DatePickerViewTrigger>
                                <DatePickerRangeText />
                              </DatePickerViewTrigger>
                            </DatePickerViewControl>
                            <DatePickerTable>
                              <DatePickerTableBody>
                                <Index
                                  each={context().getMonthsGrid({
                                    columns: 4,
                                    format: "short",
                                  })}
                                >
                                  {(months) => (
                                    <DatePickerTableRow>
                                      <Index each={months()}>
                                        {(month) => (
                                          <DatePickerTableCell
                                            value={month().value}
                                          >
                                            <DatePickerTableCellTrigger>
                                              {month().label}
                                            </DatePickerTableCellTrigger>
                                          </DatePickerTableCell>
                                        )}
                                      </Index>
                                    </DatePickerTableRow>
                                  )}
                                </Index>
                              </DatePickerTableBody>
                            </DatePickerTable>
                          </>
                        )}
                      </DatePickerContext>
                    </DatePickerView>
                    <DatePickerView view="year">
                      <DatePickerContext>
                        {(context) => (
                          <>
                            <DatePickerViewControl>
                              <DatePickerViewTrigger>
                                <DatePickerRangeText />
                              </DatePickerViewTrigger>
                            </DatePickerViewControl>
                            <DatePickerTable>
                              <DatePickerTableBody>
                                <Index
                                  each={context().getYearsGrid({
                                    columns: 4,
                                  })}
                                >
                                  {(years) => (
                                    <DatePickerTableRow>
                                      <Index each={years()}>
                                        {(year) => (
                                          <DatePickerTableCell
                                            value={year().value}
                                          >
                                            <DatePickerTableCellTrigger>
                                              {year().label}
                                            </DatePickerTableCellTrigger>
                                          </DatePickerTableCell>
                                        )}
                                      </Index>
                                    </DatePickerTableRow>
                                  )}
                                </Index>
                              </DatePickerTableBody>
                            </DatePickerTable>
                          </>
                        )}
                      </DatePickerContext>
                    </DatePickerView>
                  </DatePickerContent>
                </DatePickerPositioner>
              </Portal>
            </DatePicker>
          </form>
        </CardContent>
        <CardFooter class="justify-end gap-4">
          <Button
            class="border-red-500"
            type="button"
            variant="outline"
            as="a"
            href="/campaigns"
          >
            Cancel
          </Button>
          <Button type="submit" onClick={handleSubmission}>
            Submit
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
