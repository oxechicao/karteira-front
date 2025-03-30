import { ExpenseTemplateModel } from "@modules/expenseTemplates/models/ExpenseTemplateModel";
import { ExpenseTemplateDocument } from "@modules/expenseTemplates/schemas/ExpenseTemplateSchema";
import { DateTime } from "luxon";

export default function mapDatesEditing(data: ExpenseTemplateModel) {
  return {
    ...data,
    purchasedAt: DateTime.fromJSDate(new Date(data?.purchasedAt)),
  };
}
