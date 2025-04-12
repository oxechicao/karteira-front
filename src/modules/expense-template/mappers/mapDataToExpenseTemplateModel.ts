import { ExpenseTemplateModelForm } from "@modules/expense-template/models/ExpenseTemplateModelForm";
import { Types } from "mongoose";
import { ExpenseTemplateModelSchema } from "@modules/expense-template/schemas/ExpenseTemplateModelSchema";

export function mapDataToExpenseTemplateModel(
  data: ExpenseTemplateModelForm,
): ExpenseTemplateModelSchema {
  return {
    isAnonymous: false,
    templateName: data.templateName,
    template: {
      karteira: new Types.ObjectId(data.karteira || "67c5cae67433ea581834f72f"),
      name: data.name,
      purchasedAt: data.purchasedAt,
      value: String(data.value).replace(/\D/g, "") || "0",
      isFinished: Boolean(data.isFinished),
      valueDefinition: {
        precision: 2,
        currency: "BRL",
      },
      details: {
        category: data.details.category,
        form: data.details.form,
        source: data.details.source,
        type: data.details.type,
      },
      payment: {
        installments: [],
        totalInstallments: data.payment.totalInstallments,
        payday: data.payment.payday,
        currentInstallment: data.payment.currentInstallment,
        frequency: data.payment.frequency,
        frequencyPeriod: data.payment.frequencyPeriod,
        isRecurrent: data.payment.isRecurrent,
      },
    },
  };
}
