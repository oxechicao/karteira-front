import { Types } from "mongoose";
import { ExpenseForm } from "@modules/expense/models/ExpenseForm";

export type ExpenseListTable = {
  _id: Types.ObjectId | string;
  name: ExpenseForm["name"];
  value: ExpenseForm["value"];
  purchasedAt: ExpenseForm["purchasedAt"];
  payment: {
    installments: ExpenseForm["payment"]["installments"];
    currentInstallment: ExpenseForm["payment"]["currentInstallment"];
    totalInstallments: ExpenseForm["payment"]["totalInstallments"];
    payday: ExpenseForm["payment"]["payday"];
  };
  details: {
    category: ExpenseForm["details"]["category"];
    source: ExpenseForm["details"]["source"];
    form: ExpenseForm["details"]["form"];
    type: ExpenseForm["details"]["type"];
  };
};
