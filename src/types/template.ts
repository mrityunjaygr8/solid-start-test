import type { FormTemplateResponse } from "~/types/pocketbase-types.ts";
import type { FormItemQuestion } from "~/types/formItemQuestion.ts";

type Texpand = {
  questions: Array<FormItemQuestion>;
};

export type Template = FormTemplateResponse<string[], Texpand>;
