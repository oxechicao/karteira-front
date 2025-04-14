import { CategoryValueEnum } from "@modules/expense/constants/CategoryEnum";
import { FormValueEnum } from "@modules/expense/constants/FormEnum";
import { TypeValueEnum } from "@modules/expense/constants/TypeValueEnum";

export type IDetails = {
  category: CategoryValueEnum;
  form: FormValueEnum;
  source: string;
  type: TypeValueEnum;
};
