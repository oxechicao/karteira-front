import { ExpenseTemplateForm } from "@modules/expense-template/expense-template.type";
import { Types } from "mongoose";

export type ExpenseModelForm = ExpenseTemplateForm & {
  templateId?: Types.ObjectId;
  templateName?: string;
  shouldCreateNewTemplate?: boolean;
};

export type ExpenseListTable = {
  _id: Types.ObjectId | string;
  name: ExpenseTemplateForm["name"];
  value: ExpenseTemplateForm["value"];
  purchasedAt: ExpenseTemplateForm["purchasedAt"];
  payment: {
    currentInstallment: ExpenseTemplateForm["payment"]["currentInstallment"];
    totalInstallments: ExpenseTemplateForm["payment"]["totalInstallments"];
  };
  details: {
    category: ExpenseTemplateForm["details"]["category"];
    source: ExpenseTemplateForm["details"]["source"];
    form: ExpenseTemplateForm["details"]["form"];
    type: ExpenseTemplateForm["details"]["type"];
  };
};
