import {
  CategoryType,
  FormType,
  FrequencyType,
  TypeType,
} from "@modules/expense/models/ExpenseModel";

interface Options<T> {
  label: string;
  value: T;
}

export const frequencyOptions: Options<FrequencyType>[] = [
  { label: "Dias", value: "days" },
  { label: "Semanal", value: "weeks" },
  { label: "Mensal", value: "months" },
  { label: "Anual", value: "years" },
];

export const typeOptions: Options<TypeType>[] = [
  { label: "Parcelado", value: "installment" },
  { label: "Pix/Débito", value: "debit" },
  { label: "Recorrente", value: "recurrent" },
];

export const formOptions: Options<FormType>[] = [
  { label: "Crédito", value: "credit" },
  { label: "Débito", value: "debit" },
  { label: "Pix", value: "pix" },
];

export const categoryOptions: Options<CategoryType>[] = [
  { label: "Casa", value: "casa" },
  { label: "Fast Food", value: "fastfood" },
  { label: "Pessoal", value: "pessoal" },
  { label: "Baby Chicones", value: "chicao" },
  { label: "Baby Lore", value: "lore" },
  { label: "Mercado", value: "mercado" },
  { label: "Farmácia", value: "farmacia" },
  { label: "Saúde", value: "saude" },
  { label: "Pet", value: "pet" },
  { label: "Eventos", value: "eventos" },
  { label: "Viagem", value: "viagem" },
  { label: "Transporte", value: "transporte" },
  { label: "Streaming", value: "streaming" },
  { label: "Vesturário", value: "vestuario" },
  { label: "Educação", value: "educação" },
  { label: "Jogos", value: "jogos" },
  { label: "Reservas", value: "reservas" },
  { label: "Etc", value: "etc" },
];
