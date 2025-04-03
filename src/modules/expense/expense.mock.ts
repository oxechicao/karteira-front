import { ExpenseModelForm } from "@modules/expense/expense.type";
import { CategoryEnum } from "@common/constants/CategoryEnum";
import { FormEnum } from "@common/constants/FormEnum";
import {
  FrequencyEnum,
  FrequencyPeriodEnum,
} from "@common/constants/FrequencyEnum";
import { SourceEnum } from "@common/constants/SourceEnum";
import { TypeEnum } from "@common/constants/TypeEnum";
import { DateTime } from "luxon";
import { Types } from "mongoose";
import {
  ExpenseTemplateDetails,
  ExpenseTemplatePayment,
  ExpenseTemplateValueDefinition,
} from "@modules/expenseTemplate/expenseTemplate.type";

export const expenseValueDefinitionFabric = ({
  precision = 2,
  currency = "BRL",
}: Partial<ExpenseTemplateValueDefinition>) => ({ precision, currency });

export const expenseDetailsFabric = ({
  category = CategoryEnum.ETC,
  form = FormEnum.CREDIT,
  source = SourceEnum.NUBANK,
  type = TypeEnum.DEBIT,
}: Partial<ExpenseTemplateDetails>) => ({
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
  frequencyPeriod = FrequencyPeriodEnum.MONTHS,
  isRecurrent = false,
}: Partial<ExpenseTemplatePayment>) => ({
  installments,
  totalInstallments,
  currentInstallment,
  frequency,
  frequencyPeriod,
  isRecurrent,
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
}: Partial<ExpenseModelForm>) => ({
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
