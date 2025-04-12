import { IExpenseModel } from "@modules/expense/models/IExpenseModel";
import { ITemplateExpenseTemplate } from "@modules/expense-template/models/IExpenseTemplateModel";

export function mapExpenseTemplateToExpenseForm(
  template: ITemplateExpenseTemplate,
): IExpenseModel {
  return {
    templateId: template.templateId,
    karteira: template.karteira,
    name: template.name,
    purchasedAt: template.purchasedAt,
    value: template.value,
    isFinished: template.isFinished,
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
