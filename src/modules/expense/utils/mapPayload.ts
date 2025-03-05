import { ExpenseModel, FormType } from "@modules/expense/models/ExpenseModel";
import { DateTime } from "luxon";
import { Types } from "mongoose";

function payNextMonth(form: FormType): boolean {
  return ["credit"].includes(form);
}

export const mapPayload = (payload: ExpenseModel) => {
  return {
    definition: payload.definition,
    installment: {
      current: payload.installment.current || undefined,
      total: payload.installment.total,
    },
    name: payload.name,
    flags: {
      isRecurrent: ["monthly", "yearly", "weekly"].includes(
        payload.definition.type.name,
      ),
    },
    timeline: {
      purchasedAt: payload.timeline.purchasedAt,
      paymentsAt:
        payload.installment.total &&
        Array.from({ length: payload.installment.total }, (_, i) => ({
          date: DateTime.fromISO(payload.timeline.purchasedAt)
            .plus({
              months:
                i + ((payNextMonth(payload.definition.form.name) && 1) || 0),
            })
            .toUTC(),
          value: payload.price.value,
          paid: payload.installment.current
            ? payload.installment.current > i
            : false,
        })),
    },
    price: {
      value: payload.price.value,
      precision: payload.price.precision ?? undefined,
      currency: payload.price.currency ?? undefined,
      firstInstallmentAdditionalValue:
        payload.price.firstInstallmentAdditionalValue ?? undefined,
    },
    karteira: new Types.ObjectId(
      payload.karteira || "67c5cae67433ea581834f72f",
    ),
  };
};
