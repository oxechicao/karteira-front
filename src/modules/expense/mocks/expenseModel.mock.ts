import { CategoryEnum } from "@modules/expense/enums/CategoryEnum";
import { FormEnum } from "@modules/expense/enums/FormEnum";
import { FrequencyEnum } from "@modules/expense/enums/FrequencyEnum";
import { SourceEnum } from "@modules/expense/enums/SourceEnum";
import { TypeEnum } from "@modules/expense/enums/TypeEnum";
import {
  ExpenseDetails,
  ExpenseModel,
  ExpensePayment,
  ExpenseValueDefinition,
} from "@modules/expense/models/ExpenseModel";
import { DateTime } from "luxon";
import { Types } from "mongoose";

export const expenseValueDefinitionFabric = ({
  precision = 2,
  currency = "BRL",
}: Partial<ExpenseValueDefinition>) => ({ precision, currency });

export const expenseDetailsFabric = ({
  category = CategoryEnum.ETC,
  form = FormEnum.CREDIT,
  source = SourceEnum.NUBANK,
  type = TypeEnum.DEBIT,
}: Partial<ExpenseDetails>) => ({
  category,
  form,
  source,
  type,
});

export const expensePaymentFabric = ({
  installments = [],
  totalInstallments = 1,
  currentInstallment = 1,
  frequency = FrequencyEnum.MONTHS,
  frequencyPeriod = 0,
  isRecurrent = false,
  isFirstPaymentNextMonth = false,
}: Partial<ExpensePayment>) => ({
  installments,
  totalInstallments,
  currentInstallment,
  frequency,
  frequencyPeriod,
  isRecurrent,
  isFirstPaymentNextMonth,
});

export const expenseModelFabric = ({
  karteira = new Types.ObjectId("67c5cae67433ea581834f72f"),
  name = "Despesa",
  purchasedAt = DateTime.fromISO("2023-10-01T00:00:00Z"),
  value = 145000,
  isFinished = false,
  payday = 6,
  valueDefinition = expenseValueDefinitionFabric({}),
  details = expenseDetailsFabric({}),
  payment = expensePaymentFabric({}),
}: Partial<ExpenseModel>) => ({
  karteira,
  name,
  purchasedAt,
  value,
  isFinished,
  payday,
  valueDefinition,
  details,
  payment,
});
