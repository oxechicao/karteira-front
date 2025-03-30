import { ExpenseTemplateModel } from "@modules/expenseTemplates/models/ExpenseTemplateModel";
import { ExpenseTemplate } from "@modules/expenseTemplates/schemas/ExpenseTemplateSchema";
import { Types } from "mongoose";

export function mapDataToExpenseTemplateModel(
  data: ExpenseTemplateModel,
): ExpenseTemplate {
  return {
    templateName: data.templateName,
    template: {
      karteira: new Types.ObjectId(data.karteira || "67c5cae67433ea581834f72f"),
      name: data.name,
      purchasedAt: data.purchasedAt,
      value: Number(String(data.value).replace(/\D/g, "")) || 0,
      isFinished: !!data.isFinished,
      payday: data.payday,
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
        currentInstallment: data.payment.currentInstallment,
        frequency: data.payment.frequency,
        frequencyPeriod: data.payment.frequencyPeriod,
        isRecurrent: data.payment.isRecurrent,
        isFirstPaymentNextMonth: data.payment.isFirstPaymentNextMonth,
      },
    },
  };
}
