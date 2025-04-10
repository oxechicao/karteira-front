import { payExpense } from "@modules/expense/features/pay/payExpense.service";

export const POST = async (
  req: Request,
  { params }: { params: { id: string } },
) => {
  const { id } = params;
  const body = await req.json();
  const { dates } = body;

  if (!dates) {
    return new Response("Dates are required", { status: 400 });
  }

  const result = await payExpense(id, dates);

  return new Response(JSON.stringify(result), { status: 200 });
};
