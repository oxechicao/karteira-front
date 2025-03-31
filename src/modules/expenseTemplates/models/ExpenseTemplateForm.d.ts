import ExpenseTemplateDetails from "@modules/expenseTemplates/models/ExpenseTemplateDetails";
import ExpenseTemplatePayment from "@modules/expenseTemplates/models/ExpenseTemplatePayment";
import ExpenseTemplateValueDefinition from "@modules/expenseTemplates/models/ExpenseTemplateValueDefinition";

type ExpenseTemplateForm = {
  karteira: Types.ObjectId;
  name: string;
  purchasedAt: DateTime;
  value: number;
  isFinished: boolean;
  payday: number;
  valueDefinition: ExpenseTemplateValueDefinition;
  details: ExpenseTemplateDetails;
  payment: ExpenseTemplatePayment;
};
export default ExpenseTemplateForm;
