import {
  ExpenseModel,
  FormType,
  FrequencyType,
} from "@modules/expense/models/ExpenseModel";
import { DateTime } from "luxon";
import { Types } from "mongoose";

function payNextMonth(form: FormType): boolean {
  return ["credit"].includes(form);
}

function mapPayments(
  installment: number,
  ammountPayments: number,
  purchasedAt: string,
  price: number,
  isRecurrent?: boolean,
  frequency?: FrequencyType,
  period: number = 1,
  isNextMonth?: boolean,
): { date: DateTime; value: number; paid: boolean }[] {
  const plusObject = (index: number) => {
    if (isRecurrent) {
      switch (frequency) {
        case "months":
          return { months: (index + (isNextMonth ? 1 : 0)) * period };
        case "weeks":
          return {
            weeks: index * period,
            ...(isNextMonth ? { month: index + 1 } : {}),
          };
        case "days":
          return {
            days: index * period,
            ...(isNextMonth ? { month: index + 1 } : {}),
          };
        case "years":
          return { months: (index + (isNextMonth ? 1 : 0)) * period };
      }
    }

    return { months: index + (isNextMonth ? 1 : 0) };
  };

  return Array.from({ length: isRecurrent ? 12 : installment }, (_, i) => ({
    date: DateTime.fromISO(purchasedAt).plus(plusObject(i)).toUTC(),
    value: price,
    paid: i + 1 < ammountPayments,
  }));
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
      isRecurrent: payload.definition.type.name === "recurrent",
    },
    timeline: {
      purchasedAt: payload.timeline.purchasedAt,
      paymentsAt:
        payload.installment.total &&
        mapPayments(
          payload.installment.total,
          payload.installment.current,
          payload.timeline.purchasedAt,
          payload.price.value,
          payload.definition.type.name === "recurrent",
          payload.definition.frequency.name,
          payload.definition.frequency.period,
          payload.flags.isFirstPaymentNextMonth,
        ),
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
