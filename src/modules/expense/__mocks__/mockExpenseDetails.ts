import { CategoryEnum } from "@common/constants/CategoryEnum";
import { FormEnum } from "@common/constants/FormEnum";
import { SourceEnum } from "@common/constants/SourceEnum";
import { TypeEnum } from "@common/constants/TypeEnum";

import { IDetails } from "@modules/expense/models/IDetails";

export const expenseDetailsFabric = ({
  category = CategoryEnum.ETC,
  form = FormEnum.CREDIT,
  source = SourceEnum.NUBANK,
  type = TypeEnum.DEBIT,
}: Partial<IDetails>) => ({
  category,
  form,
  source,
  type,
});
