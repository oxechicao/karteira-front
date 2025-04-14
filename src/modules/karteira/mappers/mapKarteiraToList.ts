import { Types } from "mongoose";
import { IKarteiraModel } from "@modules/karteira/models/IKarteiraModel";

import { KarteiraModelSchema } from "@modules/karteira/schemas/KarteiraModelSchema";
import { moneyMask } from "@common/utils/doMask";

export function mapKarteiraToList(
  karteirasDocuments: KarteiraModelSchema[],
): IKarteiraModel[] {
  return karteirasDocuments.map((karteira) => ({
    _id: karteira._id || new Types.ObjectId(),
    name: karteira.name,
    owner: karteira.owner,
    guests: karteira.guests || [],
    limit: `R$ ${moneyMask(String(karteira.limit) || "")}`,
    goal: `R$ ${moneyMask(String(karteira.goal) || "")}`,
  }));
}
