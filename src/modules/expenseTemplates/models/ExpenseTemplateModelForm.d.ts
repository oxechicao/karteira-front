import ExpenseTemplateForm from "@modules/expenseTemplates/models/ExpenseTemplateForm";

type ExpenseTemplateModelForm = ExpenseTemplateForm & {
  templateName: string;
  isAnonymous: boolean;
};
export default ExpenseTemplateModelForm;
