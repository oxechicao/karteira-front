import ExpenseTemplateForm from "@modules/expenseTemplates/models/ExpenseTemplateForm";
import ExpenseTemplateModelForm from "@modules/expenseTemplates/models/ExpenseTemplateModelForm";
import { Types } from "mongoose";

type ExpenseModelForm = ExpenseTemplateForm & {
  templateId: Types.ObjectId;
  templateName: string;
  shouldCreateNewTemplate: boolean;
};

export default ExpenseModelForm;
