import { KarteiraList } from "@modules/karteira/karteira.types";
import { fetchKarteiras } from "@modules/karteira/features/list/listKarteira.repository";
import { KarteiraSchemaModel } from "@modules/karteira/karteira.schema";
import { Types } from "mongoose";
    
function mapKarteiraToList(karteirasDocuments: KarteiraSchemaModel[]): KarteiraList {
  return karteirasDocuments.map(
    karteira => ({
      _id: karteira._id || new Types.ObjectId(),
      name: karteira.name,
      owner: karteira.owner,
      guests: karteira.guests || [],
    })
  )
}

export const getKarteiras = async () : Promise<KarteiraList> => {
  const karteirasDocuments = await fetchKarteiras();
  return mapKarteiraToList(karteirasDocuments);
}