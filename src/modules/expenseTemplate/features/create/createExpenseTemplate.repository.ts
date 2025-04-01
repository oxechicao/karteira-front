import dbConnect from "@lib/mongoose/dbConnect";
import ExpenseTemplateSchema, {
  ExpenseTemplateSchemaModel,
} from "@modules/expenseTemplate/expenseTemplate.schema";

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
