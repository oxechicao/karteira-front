import { withAuth } from "@lib/with-auth/withAuth";
import { insertKarteira } from "@modules/karteira/services/insertKarteira";
import { getKarteiras } from "@modules/karteira/services/getKarteiras";

export const GET = async () => {
  const karteiras = await getKarteiras();
  return Response.json(karteiras);
};

export const POST = async (req: Request) => {
  const payload = await req.json();
  const result = await insertKarteira(payload);
  return new Response(result, { status: 201 });
};
