import { CategoryValueEnum } from "@modules/expense/constants/CategoryEnum";
import { FormValueEnum } from "@modules/expense/constants/FormEnum";
import { TypeValueEnum } from "@modules/expense/constants/TypeValueEnum";

import { IDetails } from "@modules/expense/models/IDetails";

export const expenseDetailsFabric = ({
  category = CategoryValueEnum.ETC,
  form = FormValueEnum.CREDIT,
  source = SourceEnum.NUBANK,
  type = TypeValueEnum.DEBIT,
}: Partial<IDetails>) => ({
  category,
  form,
  source,
  type,
});
