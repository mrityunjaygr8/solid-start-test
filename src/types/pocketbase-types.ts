/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Campaign = "campaign",
	FormItemQuestion = "formItemQuestion",
	FormItemType = "formItemType",
	FormTemplate = "formTemplate",
	Submissions = "submissions",
	TemplateView = "templateView",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type CampaignRecord = {
	creationDate?: IsoDateString
	creator?: RecordIdString
	deadline?: IsoDateString
	description?: string
	name?: string
	respondents?: RecordIdString[]
	template?: RecordIdString
}

export type FormItemQuestionRecord<Tvalues = unknown> = {
	description?: string
	formItemType?: RecordIdString
	questionText?: string
	values?: null | Tvalues
}

export type FormItemTypeRecord<Tschema = unknown> = {
	description?: string
	name?: string
	schema?: null | Tschema
}

export type FormTemplateRecord<Tquestions_dep = unknown> = {
	creator?: RecordIdString
	description?: string
	name?: string
	questions?: RecordIdString[]
	questions_dep?: null | Tquestions_dep
}

export type SubmissionsRecord<Tanswers = unknown> = {
	answers?: null | Tanswers
	campaign?: RecordIdString
	submitter?: RecordIdString
}

export type TemplateViewRecord = {
	creator?: RecordIdString
	description?: string
	name?: string
	questions?: RecordIdString[]
}

export type UsersRecord = {
	avatar?: string
	name?: string
}

// Response types include system fields and match responses from the PocketBase API
export type CampaignResponse<Texpand = unknown> = Required<CampaignRecord> & BaseSystemFields<Texpand>
export type FormItemQuestionResponse<Tvalues = unknown, Texpand = unknown> = Required<FormItemQuestionRecord<Tvalues>> & BaseSystemFields<Texpand>
export type FormItemTypeResponse<Tschema = unknown, Texpand = unknown> = Required<FormItemTypeRecord<Tschema>> & BaseSystemFields<Texpand>
export type FormTemplateResponse<Tquestions_dep = unknown, Texpand = unknown> = Required<FormTemplateRecord<Tquestions_dep>> & BaseSystemFields<Texpand>
export type SubmissionsResponse<Tanswers = unknown, Texpand = unknown> = Required<SubmissionsRecord<Tanswers>> & BaseSystemFields<Texpand>
export type TemplateViewResponse<Texpand = unknown> = Required<TemplateViewRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	campaign: CampaignRecord
	formItemQuestion: FormItemQuestionRecord
	formItemType: FormItemTypeRecord
	formTemplate: FormTemplateRecord
	submissions: SubmissionsRecord
	templateView: TemplateViewRecord
	users: UsersRecord
}

export type CollectionResponses = {
	campaign: CampaignResponse
	formItemQuestion: FormItemQuestionResponse
	formItemType: FormItemTypeResponse
	formTemplate: FormTemplateResponse
	submissions: SubmissionsResponse
	templateView: TemplateViewResponse
	users: UsersResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: 'campaign'): RecordService<CampaignResponse>
	collection(idOrName: 'formItemQuestion'): RecordService<FormItemQuestionResponse>
	collection(idOrName: 'formItemType'): RecordService<FormItemTypeResponse>
	collection(idOrName: 'formTemplate'): RecordService<FormTemplateResponse>
	collection(idOrName: 'submissions'): RecordService<SubmissionsResponse>
	collection(idOrName: 'templateView'): RecordService<TemplateViewResponse>
	collection(idOrName: 'users'): RecordService<UsersResponse>
}
