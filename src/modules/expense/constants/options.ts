import {
  CategoryValueEnum,
  CategoryLabelEnum,
} from "@modules/expense/constants/CategoryEnum";
import { FormEnum, FormLabelEnum } from "@modules/expense/constants/FormEnum";
import {
  FrequencyEnum,
  FrequencyLabelEnum,
} from "@modules/expense/constants/FrequencyEnum";
import {
  SourceEnum,
  SourceLabelEnum,
} from "@modules/expense/constants/SourceEnum";
import { TypeEnum, TypeLabelEnum } from "@modules/expense/constants/TypeEnum";

type Options<T, Y> = {
  label: T;
  value: Y;
};

export const frequencyOptions: Options<FrequencyLabelEnum, FrequencyEnum>[] = [
  { label: FrequencyLabelEnum.DAYS, value: FrequencyEnum.DAYS },
  { label: FrequencyLabelEnum.WEEKS, value: FrequencyEnum.WEEKS },
  { label: FrequencyLabelEnum.MONTHS, value: FrequencyEnum.MONTHS },
  { label: FrequencyLabelEnum.YEARS, value: FrequencyEnum.YEARS },
];

export const typeOptions: Options<TypeLabelEnum, TypeEnum>[] = [
  { label: TypeLabelEnum.INSTALLMENT, value: TypeEnum.INSTALLMENT },
  { label: TypeLabelEnum.DEBIT, value: TypeEnum.DEBIT },
  { label: TypeLabelEnum.RECURRENT, value: TypeEnum.RECURRENT },
];

export const formOptions: Options<FormLabelEnum, FormEnum>[] = [
  { label: FormLabelEnum.CREDIT, value: FormEnum.CREDIT },
  { label: FormLabelEnum.DEBIT, value: FormEnum.DEBIT },
  { label: FormLabelEnum.PIX, value: FormEnum.PIX },
];

export const categoryOptions: Options<CategoryLabelEnum, CategoryValueEnum>[] =
  [
    {
      label: CategoryLabelEnum.ASSINATURAS,
      value: CategoryValueEnum.ASSINATURAS,
    },
    { label: CategoryLabelEnum.CASA, value: CategoryValueEnum.CASA },
    { label: CategoryLabelEnum.EDUCACAO, value: CategoryValueEnum.EDUCACAO },
    { label: CategoryLabelEnum.ETC, value: CategoryValueEnum.ETC },
    { label: CategoryLabelEnum.FASTFOOD, value: CategoryValueEnum.FASTFOOD },
    { label: CategoryLabelEnum.LAZER, value: CategoryValueEnum.LAZER },
    { label: CategoryLabelEnum.MERCADO, value: CategoryValueEnum.MERCADO },
    { label: CategoryLabelEnum.PET, value: CategoryValueEnum.PET },
    { label: CategoryLabelEnum.RESERVAS, value: CategoryValueEnum.RESERVAS },
    { label: CategoryLabelEnum.SAUDE, value: CategoryValueEnum.SAUDE },
    {
      label: CategoryLabelEnum.TRANSPORTE,
      value: CategoryValueEnum.TRANSPORTE,
    },
    { label: CategoryLabelEnum.VESTUARIO, value: CategoryValueEnum.VESTUARIO },
  ];

export const sourceOptions: Options<SourceLabelEnum, SourceEnum>[] = [
  { label: SourceLabelEnum.ITAU, value: SourceEnum.ITAU },
  { label: SourceLabelEnum.NUBANK, value: SourceEnum.NUBANK },
  { label: SourceLabelEnum.INTER, value: SourceEnum.INTER },
  { label: SourceLabelEnum.OUTROS, value: SourceEnum.OUTROS },
];
