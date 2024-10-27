import type { CampaignResponse } from "~/types/pocketbase-types.ts";
import type { Template } from "~/types/template.ts";

type Texpand = {
  template: Template;
};

export type Campaign = CampaignResponse<Texpand>;
