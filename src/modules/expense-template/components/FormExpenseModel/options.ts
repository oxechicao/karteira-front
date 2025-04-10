import {
  CategoryEnum,
  CategoryLabelEnum,
} from "@common/constants/CategoryEnum";
import { FormEnum, FormLabelEnum } from "@common/constants/FormEnum";
import {
  FrequencyEnum,
  FrequencyLabelEnum,
} from "@common/constants/FrequencyEnum";
import { SourceEnum, SourceLabelEnum } from "@common/constants/SourceEnum";
import { TypeEnum, TypeLabelEnum } from "@common/constants/TypeEnum";

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

export const categoryOptions: Options<CategoryLabelEnum, CategoryEnum>[] = [
  { label: CategoryLabelEnum.ASSINATURAS, value: CategoryEnum.ASSINATURAS },
  { label: CategoryLabelEnum.CASA, value: CategoryEnum.CASA },
  { label: CategoryLabelEnum.EDUCACAO, value: CategoryEnum.EDUCACAO },
  { label: CategoryLabelEnum.ETC, value: CategoryEnum.ETC },
  { label: CategoryLabelEnum.FASTFOOD, value: CategoryEnum.FASTFOOD },
  { label: CategoryLabelEnum.LAZER, value: CategoryEnum.LAZER },
  { label: CategoryLabelEnum.MERCADO, value: CategoryEnum.MERCADO },
  { label: CategoryLabelEnum.PET, value: CategoryEnum.PET },
  { label: CategoryLabelEnum.RESERVAS, value: CategoryEnum.RESERVAS },
  { label: CategoryLabelEnum.SAUDE, value: CategoryEnum.SAUDE },
  { label: CategoryLabelEnum.TRANSPORTE, value: CategoryEnum.TRANSPORTE },
  { label: CategoryLabelEnum.VESTUARIO, value: CategoryEnum.VESTUARIO },
];

export const sourceOptions: Options<SourceLabelEnum, SourceEnum>[] = [
  { label: SourceLabelEnum.ITAU, value: SourceEnum.ITAU },
  { label: SourceLabelEnum.NUBANK, value: SourceEnum.NUBANK },
  { label: SourceLabelEnum.INTER, value: SourceEnum.INTER },
  { label: SourceLabelEnum.OUTROS, value: SourceEnum.OUTROS },
];
