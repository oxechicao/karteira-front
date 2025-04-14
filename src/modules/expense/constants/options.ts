import {
  CategoryValueEnum,
  CategoryLabelEnum,
} from "@modules/expense/constants/CategoryEnum";
import {
  FormValueEnum,
  FormLabelEnum,
} from "@modules/expense/constants/FormEnum";
import {
  FrequencyEnum,
  FrequencyLabelEnum,
} from "@modules/expense/constants/FrequencyEnum";
import {
  TypeValueEnum,
  TypeLabelEnum,
} from "@modules/expense/constants/TypeValueEnum";

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

export const typeOptions: Options<TypeLabelEnum, TypeValueEnum>[] = [
  { label: TypeLabelEnum.INSTALLMENT, value: TypeValueEnum.INSTALLMENT },
  { label: TypeLabelEnum.DEBIT, value: TypeValueEnum.DEBIT },
  { label: TypeLabelEnum.RECURRENT, value: TypeValueEnum.RECURRENT },
];

export const formOptions: Options<FormLabelEnum, FormValueEnum>[] = [
  { label: FormLabelEnum.CREDIT, value: FormValueEnum.CREDIT },
  { label: FormLabelEnum.DEBIT, value: FormValueEnum.DEBIT },
  { label: FormLabelEnum.PIX, value: FormValueEnum.PIX },
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
