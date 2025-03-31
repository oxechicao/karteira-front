import { ExpenseTemplateForm } from "@modules/expenseTemplates/expenseTemplate.type";
import { Types } from "mongoose";

export type ExpenseModelForm = ExpenseTemplateForm & {
  templateId?: Types.ObjectId;
  templateName?: string;
  shouldCreateNewTemplate?: boolean;
};
