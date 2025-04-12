import { IKarteiraModel } from "@modules/karteira/models/IKarteiraModel";
import { mapperKarteiraToSchema } from "@modules/karteira/mappers/mapperKarteiraToSchema";
import { saveKarteira } from "@modules/karteira/repositories/saveKarteira";

export const insertKarteira = async (data: IKarteiraModel) => {
  const karteira = mapperKarteiraToSchema(data);
  return saveKarteira(karteira);
};
