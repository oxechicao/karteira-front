"use server";

import {
  mapExpenseSchema,
  mapFormExpenseEditing,
} from "@modules/expense/expense.mapper";
import { ExpenseDocument } from "@modules/expense/expense.schema";
import { ExpenseModelForm } from "@modules/expense/expense.type";
import {
  ExpenseTemplateModelForm,
  ExpenseTemplatePaymentAt,
} from "@modules/expense-template/expenseTemplate.type";
import { newExpenseTemplate } from "@modules/expense-template/features/create/createExpenseTemplate.service";
import { DateTime } from "luxon";
import {
  fetchExpenseById,
  insertExpense,
  updateExpense,
} from "@modules/expense/expense.repository";

export async function getByIdEditExpense(id: string) {
  const expense = await fetchExpenseById(id);
  return mapFormExpenseEditing(expense as unknown as ExpenseDocument);
}

async function saveExpenseTemplateFromExpense(data: ExpenseModelForm) {
  const expenseTemplate = {
    ...data,
    templateName: data.templateName || "",
    isAnonymous: false,
  } as ExpenseTemplateModelForm;

  await newExpenseTemplate(expenseTemplate);
}

export async function saveExpense(data: ExpenseModelForm) {
  if (data.shouldCreateNewTemplate) {
    saveExpenseTemplateFromExpense(data);
  }

  const expense = mapExpenseSchema(data);
  const result = await insertExpense(expense);
  return result;
}

export const updateExpenseById = async (id: string, body: ExpenseModelForm) => {
  const expense = mapExpenseSchema(body);
  return await updateExpense(id, expense);
};
export const payExpense = async (expenseId: string, dates: DateTime[]) => {
  const expense = await fetchExpenseById(expenseId);
  if (!expense) {
    throw new Error("Expense not found");
  }

  expense.payment.installments = expense.payment.installments.map(
    (installment: ExpenseTemplatePaymentAt): ExpenseTemplatePaymentAt => {
      if (dates.some((date) => date === installment.date)) {
        installment.isPaid = true;
      }

      return installment;
    },
  );

  await updateExpenseById(expenseId, expense);

  return { message: "Expense paid successfully" };
};
