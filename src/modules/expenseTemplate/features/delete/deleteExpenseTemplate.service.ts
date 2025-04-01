"use server";

import { deleteByIdExpenseTemplate } from "@modules/expenseTemplate/features/delete/deleteExpenseTemplate.repository";

export async function deleteExpenseTemplate(id: string) {
  return await deleteByIdExpenseTemplate(id);
}
