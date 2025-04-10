import { KarteiraSchemaModel } from "@modules/karteira/karteira.schema";
import { KarteiraList, KarteiraModel } from "@modules/karteira/karteira.types";
import { Types } from "mongoose";

export const mapperKarteiraToSchema = (
  data: KarteiraModel,
): KarteiraSchemaModel => {
  return {
    name: data.name,
    owner: data.owner,
    guests: data?.guests || [],
  };
};

export function mapKarteiraToList(
  karteirasDocuments: KarteiraSchemaModel[],
): KarteiraList {
  return karteirasDocuments.map((karteira) => ({
    _id: karteira._id || new Types.ObjectId(),
    name: karteira.name,
    owner: karteira.owner,
    guests: karteira.guests || [],
  }));
}
