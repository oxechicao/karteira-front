import { CategoryEnum } from "@common/constants/CategoryEnum";
import { FormEnum } from "@common/constants/FormEnum";
import { TypeEnum } from "@common/constants/TypeEnum";

export type IDetails = {
  category: CategoryEnum;
  form: FormEnum;
  source: string;
  type: TypeEnum;
};
