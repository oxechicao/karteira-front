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

export type ExpenseTemplateValueDefinition = {
  precision: number;
  currency: string;
};

export type ExpenseTemplateDetails = {
  category: CategoryEnum;
  form: FormEnum;
  source: SourceEnum;
  type: TypeEnum;
};

export type ExpenseTemplatePayment = {
  installments: ExpenseTemplatePaymentAt[];
  totalInstallments: number;
  currentInstallment: number;
  frequency: FrequencyEnum;
  frequencyPeriod: FrequencyPeriodEnum;
  isRecurrent: boolean;
  isFirstPaymentNextMonth: boolean;
};

export type ExpenseTemplatePaymentAt = {
  date: DateTime;
  value: number;
  isPaid: boolean;
};

export type ExpenseTemplateForm = {
  karteira: Types.ObjectId;
  name: string;
  purchasedAt: DateTime;
  value: number;
  isFinished: boolean;
  payday: number;
  valueDefinition: ExpenseTemplateValueDefinition;
  details: ExpenseTemplateDetails;
  payment: ExpenseTemplatePayment;
};

export type ExpenseTemplateModelForm = ExpenseTemplateForm & {
  templateName: string;
  templateId: Types.ObjectId;
  isAnonymous: boolean;
};
