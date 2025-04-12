"use server";

import { deleteByIdExpenseTemplate } from "@modules/expense-template/repositories/deleteByIdExpenseTemplate";

export async function deleteExpenseTemplate(id: string) {
  return await deleteByIdExpenseTemplate(id);
}
