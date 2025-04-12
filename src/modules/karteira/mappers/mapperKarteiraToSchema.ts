import { IKarteiraModel } from "@modules/karteira/models/IKarteiraModel";
import { KarteiraModelSchema } from "@modules/karteira/schemas/KarteiraModelSchema";

export function mapperKarteiraToSchema(
  data: IKarteiraModel,
): KarteiraModelSchema {
  return {
    name: data.name,
    owner: data.owner,
    guests: data?.guests || [],
  };
}
