import dbConnect from "@lib/mongoose/dbConnect";
import { getExpensesFromToday } from "@modules/expense/expense.repository";
import { saveExpense } from "@modules/expense/expense.service";

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
