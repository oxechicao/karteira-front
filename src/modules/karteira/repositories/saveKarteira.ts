import dbConnect from "@lib/mongoose/dbConnect";
import { KarteiraModel } from "@modules/karteira/schemas/KarteiraModel";
import { IKarteiraModel } from "@modules/karteira/models/IKarteiraModel";

export const saveKarteira = async (data: IKarteiraModel) => {
  const karteira = new KarteiraModel(data);
  const validations = await karteira.validate();
  if (validations.errors.length > 0) {
    throw new Error("Validation error", validations.errors);
  }

  await dbConnect();
  await karteira.save();
  return karteira;
};
