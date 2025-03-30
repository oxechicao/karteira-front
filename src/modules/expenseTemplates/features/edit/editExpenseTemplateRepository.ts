"use server";

import dbConnect from "@lib/mongoose/dbConnect";
import ExpenseTemplateSchema, {
  ExpenseTemplate,
} from "@modules/expenseTemplates/schemas/ExpenseTemplateSchema";

export const fetchByIdExpenseTemplate = async (id: string) => {
  await dbConnect();
  const result = await ExpenseTemplateSchema.findById(id).populate("template");
  return result;
};
export const updateByIdExpenseTemplate = async (
  id: string,
  data: ExpenseTemplate,
) => {
  const expenseTemplate = new ExpenseTemplateSchema(data);
  const validate = await expenseTemplate.validate();
  if (validate?.errors?.length > 0) {
    throw new Error("Validation error", validate.errors);
  }

  await dbConnect();
  const result = await ExpenseTemplateSchema.findByIdAndUpdate(id, data);
  return result;
};
