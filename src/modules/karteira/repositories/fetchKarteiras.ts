import dbConnect from "@lib/mongoose/dbConnect";
import { KarteiraModel } from "@modules/karteira/schemas/KarteiraModel";
import { KarteiraModelSchema } from "@modules/karteira/schemas/KarteiraModelSchema";

export async function fetchKarteiras(): Promise<KarteiraModelSchema[]> {
  await dbConnect();
  return KarteiraModel.find({}).lean<KarteiraModelSchema[]>();
}
