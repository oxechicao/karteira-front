export type ExpenseDefinition = {
  color: string;
  name: string;
}

export type ExpenseModel = {
  definition: {
    form: ExpenseDefinition;
    type: ExpenseDefinition;
    source: ExpenseDefinition;
    category: ExpenseDefinition;
  }
  installment: { current: number; total: number };
  name: string;
  timeline: { lastPaymentAt: DateTime; purchasedAt: DateTime; paymentsAt: DateTime[] };
  value: { precision: number; currency: string; value: number; firstInstallmentAdditionalValue: number; }
}