import { IKarteiraModel } from "@modules/karteira/models/IKarteiraModel";
import { fetchKarteiras } from "@modules/karteira/repositories/fetchKarteiras";
import { mapKarteiraToList } from "@modules/karteira/mappers/mapKarteiraToList";

export const getKarteiras = async (): Promise<IKarteiraModel[]> => {
  const karteirasDocuments = await fetchKarteiras();
  return mapKarteiraToList(karteirasDocuments);
};
