import { KarteiraModel } from "@modules/karteira/karteira.types";
import KarteiraSchema, {
  KarteiraSchemaModel,
} from "@modules/karteira/karteira.schema";
import dbConnect from "@lib/mongoose/dbConnect";

export const insertKarteira = async (data: KarteiraModel) => {
  const karteira = new KarteiraSchema(data);
  const validations = await karteira.validate();
  if (validations.errors.length > 0) {
    throw new Error("Validation error", validations.errors);
  }

  await dbConnect();
  await karteira.save();
  return karteira;
};

export const fetchKarteiras = async (): Promise<KarteiraSchemaModel[]> => {
  await dbConnect();
  return KarteiraSchema.find({}).lean<KarteiraSchemaModel[]>();
};
