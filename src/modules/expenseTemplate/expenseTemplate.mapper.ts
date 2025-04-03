import { ExpenseTemplateSchemaModel } from "@modules/expenseTemplate/expenseTemplate.schema";
import { ExpenseTemplateModelForm } from "@modules/expenseTemplate/expenseTemplate.type";
import { DateTime } from "luxon";
import { Types } from "mongoose";

export function mapFormExpenseTemplateEditing(
  data: ExpenseTemplateModelForm,
): ExpenseTemplateModelForm {
  return {
    ...data,
    isFinished: Boolean(data?.isFinished),
    purchasedAt: DateTime.fromJSDate(new Date(data?.purchasedAt?.toString())),
    payment: {
      ...data?.payment,
      isRecurrent: !!data?.payment?.isRecurrent,
    },
  };
}
export function mapDataToExpenseTemplateModel(
  data: ExpenseTemplateModelForm,
): ExpenseTemplateSchemaModel {
  return {
    isAnonymous: false,
    templateName: data.templateName,
    template: {
      karteira: new Types.ObjectId(data.karteira || "67c5cae67433ea581834f72f"),
      name: data.name,
      purchasedAt: data.purchasedAt,
      value: Number(String(data.value).replace(/\D/g, "")) || 0,
      isFinished: Boolean(data.isFinished),
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
      },
    },
  };
}
