import { ExpenseForm } from "@modules/expense/models/ExpenseForm";
import { DateTime } from "luxon";
import { Types } from "mongoose";
import { CategoryValueEnum } from "@modules/expense/constants/CategoryEnum";
import { FormValueEnum } from "@modules/expense/constants/FormEnum";
import { TypeValueEnum } from "@modules/expense/constants/TypeValueEnum";
import {
  FrequencyEnum,
  FrequencyPeriodEnum,
} from "@modules/expense/constants/FrequencyEnum";
import ExpenseModel, {
  ExpenseDocument,
} from "@modules/expense/schemas/ExpenseModel";

export function mockExpenseModelForm(data?: Partial<ExpenseForm>): ExpenseForm {
  const overrides = data ? data : {};
  return {
    ...defaultExpenseModelForm,
    ...overrides,
  } as ExpenseForm;
}

export function mockExpenseDocument(
  overrides?: Partial<ExpenseDocument>,
): ExpenseDocument {
  return {
    ...defaultExpenseDocument.toObject(),
    ...(overrides || {}),
  } as ExpenseDocument;
}

const defaultPurchasedAt: DateTime = DateTime.fromJSDate(
  new Date("2024-05-04"),
);
const defaultTemplateId = new Types.ObjectId("64b7f3c2e4b0f5d1a8c9e7a1");
const defaultExpenseModelForm: ExpenseForm = {
  shouldPayCurrentMonth: false,
  templateName: "MOCK TEMPLATE",
  valueDefinition: {
    precision: 2,
    currency: "BRL",
  },
  name: "",
  value: 0,
  purchasedAt: defaultPurchasedAt,
  isFinished: false,
  templateId: defaultTemplateId,
  shouldCreateNewTemplate: false,
  details: {
    category: CategoryValueEnum.ETC,
    source: SourceEnum.OUTROS,
    form: FormValueEnum.PIX,
    type: TypeValueEnum.INSTALLMENT,
  },
  payment: {
    installments: [],
    totalInstallments: 3,
    currentInstallment: 2,
    frequency: FrequencyEnum.MONTHS,
    frequencyPeriod: FrequencyPeriodEnum.MONTHS,
    isRecurrent: false,
    payday: 7,
  },
  karteira: new Types.ObjectId(),
};

const defaultExpenseDocument: ExpenseDocument = new ExpenseModel({
  _id: new Types.ObjectId(),
  templateId: new Types.ObjectId(),
  karteira: new Types.ObjectId(),
  name: "Default Expense",
  purchasedAt: defaultPurchasedAt,
  value: 10000, // Example value in cents
  isFinished: false,
  valueDefinition: {
    precision: 2,
    currency: "BRL",
  },
  details: {
    category: CategoryValueEnum.ETC,
    source: SourceEnum.OUTROS,
    form: FormValueEnum.PIX,
    type: TypeValueEnum.INSTALLMENT,
  },
  payment: {
    installments: [],
    totalInstallments: 1,
    currentInstallment: 1,
    frequency: FrequencyEnum.MONTHS,
    frequencyPeriod: FrequencyPeriodEnum.MONTHS,
    isRecurrent: false,
    payday: 1,
  },
  createdAt: new Date(),
  updatedAt: new Date(),
});
