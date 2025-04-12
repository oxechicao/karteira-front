import { ExpenseForm } from "@modules/expense/models/ExpenseForm";
import { ExpenseTemplateModelForm } from "@modules/expense-template/models/ExpenseTemplateModelForm";

export function mapExpenseToExpenseTemplate(
  expense: ExpenseForm,
): ExpenseTemplateModelForm {
  return {
    templateName: expense.templateName || "",
    templateId: expense.templateId,
    template: {
      karteira: expense.karteira,
      name: expense.name,
      purchasedAt: expense.purchasedAt,
      value: expense.value,
      valueDefinition: expense.valueDefinition,
      details: expense.details,
      payment: expense.payment,
    },
  };
}
