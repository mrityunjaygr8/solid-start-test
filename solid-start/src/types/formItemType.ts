import type { FormItemTypeResponse } from "~/types/pocketbase-types.ts";

type FormItemTypeSchema = {
  options: object;
};
export type FormItemType = FormItemTypeResponse<FormItemTypeSchema>;
