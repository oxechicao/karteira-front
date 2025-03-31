import {
  FrequencyEnum,
  FrequencyPeriodEnum,
} from "@modules/expense/enums/FrequencyEnum";
import ExpenseTemplatePaymentAt from "@modules/expenseTemplates/models/ExpenseTemplatePaymentAt";

type ExpenseTemplatePayment = {
  installments: ExpenseTemplatePaymentAt[];
  totalInstallments: number;
  currentInstallment: number;
  frequency: FrequencyEnum;
  frequencyPeriod: FrequencyPeriodEnum;
  isRecurrent: boolean;
  isFirstPaymentNextMonth: boolean;
};
export default ExpenseTemplatePayment;
