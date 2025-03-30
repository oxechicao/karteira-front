"use server";

import { fetchExpenseTemplates } from "@modules/expenseTemplates/features/list/listExpenseTemplateRepository";

export const getExpensesTemplates = async () => {
  const result = await fetchExpenseTemplates();
  return result;
};
