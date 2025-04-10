"use server";

import ExpenseTemplateSchema, {
  ExpenseTemplateSchemaModel,
} from "@modules/expense-template/expense-template.schema";
import dbConnect from "@lib/mongoose/dbConnect";

export const saveExpenseTemplate = async (data: ExpenseTemplateSchemaModel) => {
  const expenseTemplate = new ExpenseTemplateSchema(data);
  const validate = await expenseTemplate.validate();

  if (validate?.errors?.length > 0) {
    throw new Error("Validation error", validate.errors);
  }

  await dbConnect();
  await expenseTemplate.save();

  return expenseTemplate;
};

export async function deleteByIdExpenseTemplate(id: string) {
  await dbConnect();
  return ExpenseTemplateSchema.findByIdAndDelete(id);
}

export async function fetchByIdExpenseTemplate(id: string) {
  await dbConnect();
  return ExpenseTemplateSchema.findById(id).populate("template");
}
export async function updateByIdExpenseTemplate(
  id: string,
  data: ExpenseTemplateSchemaModel,
) {
  const expenseTemplate = new ExpenseTemplateSchema(data);
  const validate = await expenseTemplate.validate();
  if (validate?.errors?.length > 0) {
    throw new Error("Validation error", validate.errors);
  }

  await dbConnect();
  return ExpenseTemplateSchema.findByIdAndUpdate(id, data);
}

export async function fetchExpenseTemplates() {
  await dbConnect();
  return ExpenseTemplateSchema.find({}).sort({ createdAt: -1 });
}
