"use server";

import { fetchExpenseTemplates } from "@modules/expenseTemplates/features/list/listExpenseTemplate.repository";

export const getExpensesTemplates = async () => {
  const result = await fetchExpenseTemplates();
  return result;
};
