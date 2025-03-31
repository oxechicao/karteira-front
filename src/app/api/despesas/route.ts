import dbConnect from "@lib/mongoose/dbConnect";
import saveExpense from "@modules/expense/features/create/createExpense.service";
import getExpensesFromToday from "@modules/expense/features/list/listExpense.repository";

export const dynamic = "force-dynamic";

export const GET = async () => {
  await dbConnect();
  const data = await getExpensesFromToday();
  return Response.json(data);
};

export const POST = async (req: Request) => {
  await dbConnect();
  const payload = await req.json();
  await saveExpense(payload);
  return new Response(null, { status: 201 });
};
