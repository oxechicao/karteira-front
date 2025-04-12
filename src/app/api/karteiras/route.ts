import { withAuth } from "@lib/with-auth/withAuth";
import { insertKarteira } from "@modules/karteira/services/insertKarteira";
import { getKarteiras } from "@modules/karteira/services/getKarteiras";

export const GET = withAuth(async () => {
  const karteiras = await getKarteiras();
  return Response.json({ data: karteiras });
});

export const POST = withAuth(async (req: Request) => {
  const payload = await req.json();
  const result = await insertKarteira(payload);
  return new Response(result, { status: 201 });
});
