import dbConnect from "@lib/mongoose/dbConnect";
import { getExpensesFromToday } from "@modules/expense/services/getExpensesFromToday";
import { saveExpense } from "@modules/expense/services/saveExpenseTemplateFromExpense";

export const dynamic = "force-dynamic";

export const GET = async () => {
  const data = await getExpensesFromToday();
  return Response.json(data);
};

export const POST = async (req: Request) => {
  await dbConnect();
  const payload = await req.json();
  await saveExpense(payload);
  return new Response(null, { status: 201 });
};
