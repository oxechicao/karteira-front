import { KarteiraSchemaModel } from "@modules/karteira/karteira.schema";
import { KarteiraModel } from "@modules/karteira/karteira.types";

export const mapperKarteiraToSchema = (data: KarteiraModel): KarteiraSchemaModel => {
  return {
    name: data.name,
    owner: data.owner,
    guests: data?.guests  || [],
  }
}