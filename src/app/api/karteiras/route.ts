import { withAuth } from "@lib/with-auth/withAuth";
import { getKarteiras, saveKarteira } from "@modules/karteira/karteira.service";

export const GET = withAuth(async () => {
  const karteiras = await getKarteiras();
  return Response.json({ data: karteiras });
});

export const POST = withAuth(async (req: Request) => {
  const payload = await req.json();
  const result = await saveKarteira(payload);
  return new Response(result, { status: 201 });
});
