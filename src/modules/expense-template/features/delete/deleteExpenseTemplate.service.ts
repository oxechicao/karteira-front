"use server";

import { deleteByIdExpenseTemplate } from "@modules/expense-template/features/delete/deleteExpenseTemplate.repository";

export async function deleteExpenseTemplate(id: string) {
  return await deleteByIdExpenseTemplate(id);
}
