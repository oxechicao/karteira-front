import { IExpenseModel } from "@modules/expense/models/IExpenseModel";
import { ITemplateExpenseTemplate } from "@modules/expense-template/models/IExpenseTemplateModel";
import { ExpenseTemplateModelSchema } from "@modules/expense-template/schemas/ExpenseTemplateModelSchema";
import { convertToDateTime } from "@common/utils/date";

export function mapExpenseTemplateToExpenseForm(
  expenseTemplate: ExpenseTemplateModelSchema,
): Omit<IExpenseModel, "isFinished" | "templateId"> {
  const { template } = expenseTemplate;
  return {
    karteira: template.karteira,
    name: template.name,
    purchasedAt: convertToDateTime(template.purchasedAt),
    value: template.value,
    valueDefinition: {
      ...template.valueDefinition,
    },
    details: {
      ...template.details,
    },
    payment: {
      ...template.payment,
    },
  };
}
