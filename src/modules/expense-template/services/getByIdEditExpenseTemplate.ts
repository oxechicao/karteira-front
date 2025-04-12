"use server";

import { fetchByIdExpenseTemplate } from "@modules/expense-template/repositories/fetchByIdExpenseTemplate";

export const getByIdEditExpenseTemplate = async (id: string) => {
  const result = await fetchByIdExpenseTemplate(id);
  const template = result.template._doc;
  return {
    templateName: result?.templateName,
    ...template,
  };
};
