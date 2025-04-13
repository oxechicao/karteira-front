import { CategoryValueEnum } from "@modules/expense/constants/CategoryEnum";
import { FormEnum } from "@modules/expense/constants/FormEnum";
import { SourceEnum } from "@modules/expense/constants/SourceEnum";
import { TypeEnum } from "@modules/expense/constants/TypeEnum";

import { IDetails } from "@modules/expense/models/IDetails";

export const expenseDetailsFabric = ({
  category = CategoryValueEnum.ETC,
  form = FormEnum.CREDIT,
  source = SourceEnum.NUBANK,
  type = TypeEnum.DEBIT,
}: Partial<IDetails>) => ({
  category,
  form,
  source,
  type,
});
