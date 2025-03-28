import { CategoryEnum } from "@modules/expense/enums/CategoryEnum";
import { FormEnum } from "@modules/expense/enums/FormEnum";
import { FrequencyEnum } from "@modules/expense/enums/FrequencyEnum";
import { SourceEnum } from "@modules/expense/enums/SourceEnum";
import { TypeEnum } from "@modules/expense/enums/TypeEnum";
import { Types } from "mongoose";

export type PaymentAt = {
  date: DateTime;
  value: number;
  paid: boolean;
};
interface ExpenseValueDefinition {
  precision: number;
  currency: string;
}

interface ExpensePayment {
  installments: PaymentAt[];
  totalInstallments: number;
  currentInstallment: number;
  frequency: FrequencyEnum;
  frequencyPeriod: FrequencyPeriodEnum;
  isRecurrent: boolean;
  isFirstPaymentNextMonth: boolean;
}

interface ExpenseDetails {
  category: CategoryEnum;
  form: FormEnum;
  source: SourceEnum;
  type: TypeEnum;
}

export interface ExpenseModel {
  karteira: Types.ObjectId;
  name: string;
  purchasedAt: DateTime;
  value: number;
  isFinished: boolean;
  dueDate: number;
  valueDefinition: ExpenseValueDefinition;
  details: ExpenseDetails;
  payment: ExpensePayment;
}
