"use server";

import { fetchExpenseTemplates } from "@modules/expenseTemplate/features/list/listExpenseTemplate.repository";

export const getExpensesTemplates = async () => {
  const result = await fetchExpenseTemplates();
  return result;
};
