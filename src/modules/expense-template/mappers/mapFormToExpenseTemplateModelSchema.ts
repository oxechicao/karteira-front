import { ExpenseTemplateModelForm } from "@modules/expense-template/models/ExpenseTemplateModelForm";
import { Types } from "mongoose";
import { ExpenseTemplateModelSchema } from "@modules/expense-template/schemas/ExpenseTemplateModelSchema";

export function mapFormToExpenseTemplateModelSchema(
  data: ExpenseTemplateModelForm,
): ExpenseTemplateModelSchema {
  return {
    templateName: data.templateName,
    template: {
      karteira: new Types.ObjectId(
        data.template.karteira || "67c5cae67433ea581834f72f",
      ),
      name: data.template.name,
      purchasedAt: data.template.purchasedAt,
      value: String(data.template.value).replace(/\D/g, "") || "0",
      valueDefinition: {
        precision: 2,
        currency: "BRL",
      },
      details: {
        category: data.template.details.category,
        form: data.template.details.form,
        source: data.template.details.source,
        type: data.template.details.type,
      },
      payment: {
        installments: [],
        totalInstallments: data.template.payment.totalInstallments,
        payday: data.template.payment.payday,
        currentInstallment: data.template.payment.currentInstallment,
        frequency: data.template.payment.frequency,
        frequencyPeriod: data.template.payment.frequencyPeriod,
        isRecurrent: data.template.payment.isRecurrent,
      },
    },
  };
}
