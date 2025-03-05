import { Types } from "mongoose";

export type ExpenseDefinitionName = "form" | "type" | "source" | "category";
export type SourceType = "itau" | "nubank" | "inter" | "irmao";
export type CategoryType =
  | "casa"
  | "fastfood"
  | "pessoal"
  | "mercado"
  | "farmacia"
  | "saude"
  | "pet"
  | "eventos"
  | "viagem"
  | "transporte"
  | "streaming"
  | "vestuario"
  | "educação"
  | "jogos"
  | "reservas"
  | "etc";

export type FormType = "credit" | "debit";

export type TypeType =
  | "installment"
  | "debit"
  | "planning"
  | "monthly"
  | "yearly"
  | "weekly";

type DefinitionsTag = ExpenseDefinitionName &
  SourceType &
  CategoryType &
  FormType &
  TypeType;

export type ExpenseDefinition<T> = {
  color: string;
  name: T;
};

export type PaymentAt = {
  date: DateTime;
  value: number;
  paid: boolean;
};

export type Flags = {
  isRecurrent: boolean;
};

export type ExpenseModel = {
  karteira: Types.ObjectId;
  definition: {
    form: ExpenseDefinition<FormType>;
    type: ExpenseDefinition<TypeType>;
    source: ExpenseDefinition<SourceType>;
    category: ExpenseDefinition<CategoryType>;
  };
  flags: Flags;
  installment: { current: number; total: number };
  name: string;
  timeline: {
    lastPaymentAt: DateTime;
    purchasedAt: DateTime;
    paymentsAt: PaymentAt[];
  };
  price: {
    precision: number;
    currency: string;
    value: number;
    firstInstallmentAdditionalValue: number;
  };
};
