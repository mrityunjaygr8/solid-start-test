import type { FormItemQuestionResponse } from "~/types/pocketbase-types.ts";
import type { FormItemType } from "~/types/formItemType.ts";

type FormItemQuestionValueType = {
  options: object;
};

export type FormItemQuestion = FormItemQuestionResponse<
  FormItemQuestionValueType,
  {
    formItemType: FormItemType;
  }
>;
