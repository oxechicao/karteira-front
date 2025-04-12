import { Types } from "mongoose";
import { IExpenseTemplateModel } from "@modules/expense-template/models/IExpenseTemplateModel";
import { DateTime } from "luxon";
import { IValueDefinition } from "@modules/expense/models/IValueDefinition";
import { IDetails } from "@modules/expense/models/IDetails";
import { IPayment } from "@modules/expense/models/IPayment";
import { IExpenseModel } from "@modules/expense/models/IExpenseModel";

export type ExpenseForm = IExpenseModel & {
  templateName?: string;
  shouldCreateNewTemplate?: boolean;
  shouldPayCurrentMonth?: boolean;
};
