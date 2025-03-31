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
