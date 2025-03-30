"use server";

import { deleteByIdExpenseTemplate } from "@modules/expenseTemplates/features/delete/deleteExpenseTemplateRepository";

export async function deleteExpenseTemplate(id: string) {
  return await deleteByIdExpenseTemplate(id);
}
