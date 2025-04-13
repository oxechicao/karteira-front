import { CategoryValueEnum } from "@modules/expense/constants/CategoryEnum";
import { FormEnum } from "@modules/expense/constants/FormEnum";
import { TypeEnum } from "@modules/expense/constants/TypeEnum";

export type IDetails = {
  category: CategoryValueEnum;
  form: FormEnum;
  source: string;
  type: TypeEnum;
};
