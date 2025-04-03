import { withAuth } from "@lib/with-auth/withAuth";
import { saveKarteira } from "@modules/karteira/features/create/createKarteira.service";
import { getKarteiras } from "@modules/karteira/features/list/listKarteira.service";

export const GET = withAuth(async () => {
  const karteiras = await getKarteiras();
  return Response.json({ data: karteiras });
});

export const POST = withAuth(async (req: Request) => {
  const payload = await req.json();
  const result = await saveKarteira(payload);
  return new Response(result, { status: 201 });
});
