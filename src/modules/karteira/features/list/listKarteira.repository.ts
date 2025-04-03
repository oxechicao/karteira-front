import KarteiraSchema, {
  KarteiraSchemaModel,
} from "@modules/karteira/karteira.schema";
import dbConnect from "@lib/mongoose/dbConnect";

export const fetchKarteiras = async (): Promise<KarteiraSchemaModel[]> => {
  await dbConnect();
  return KarteiraSchema.find({}).lean<KarteiraSchemaModel[]>();
};
