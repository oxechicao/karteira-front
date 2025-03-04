import dbConnect from "@lib/mongoose/dbConnect";
import { withAuth } from "@lib/with-auth/withAuth";
import Karteira from "@modules/karteira/models/Karteira"

export const GET = withAuth(async () => {
  await dbConnect();
  const karteiras = await Karteira.find({});
  return Response.json({ data: karteiras })
});