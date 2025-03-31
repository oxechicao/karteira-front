"use server";

import { deleteByIdExpenseTemplate } from "@modules/expenseTemplates/features/delete/deleteExpenseTemplate.repository";

export async function deleteExpenseTemplate(id: string) {
  return await deleteByIdExpenseTemplate(id);
}
