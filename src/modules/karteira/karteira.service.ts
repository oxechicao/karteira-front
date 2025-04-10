import { KarteiraList, KarteiraModel } from "@modules/karteira/karteira.types";
import {
  mapKarteiraToList,
  mapperKarteiraToSchema,
} from "@modules/karteira/karteira.mapper";
import {
  fetchKarteiras,
  insertKarteira,
} from "@modules/karteira/karteira.repository";

export const saveKarteira = async (data: KarteiraModel) => {
  const karteira = mapperKarteiraToSchema(data);
  return insertKarteira(karteira);
};

export const getKarteiras = async (): Promise<KarteiraList> => {
  const karteirasDocuments = await fetchKarteiras();
  return mapKarteiraToList(karteirasDocuments);
};
