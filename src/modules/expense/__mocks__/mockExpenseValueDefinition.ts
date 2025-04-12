import { IValueDefinition } from "@modules/expense/models/IValueDefinition";

export const expenseValueDefinitionFabric = ({
  precision = 2,
  currency = "BRL",
}: Partial<IValueDefinition>) => ({ precision, currency });
