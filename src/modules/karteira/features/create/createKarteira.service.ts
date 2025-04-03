import { mapperKarteiraToSchema } from "@modules/karteira/karteira.mapper";
import { KarteiraModel } from "@modules/karteira/karteira.types";
import { insertKarteira } from "@modules/karteira/features/create/createKarteira.repository";

export const saveKarteira = async (data: KarteiraModel) => {
  const karteira = mapperKarteiraToSchema(data);
  return insertKarteira(karteira);
}