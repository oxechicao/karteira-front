import dbConnect from "@lib/mongoose/dbConnect";
import { newExpenseTemplate } from "@modules/expense-template/services/newExpenseTemplate";
import { getExpensesTemplates } from "@modules/expense-template/services/getExpensesTemplates";

export const dynamic = "force-dynamic";

export const POST = async (req: Request) => {
  const body = await req.json();
  const result = await newExpenseTemplate(body);
  return new Response(JSON.stringify(result), {
    status: 201,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const GET = async () => {
  await dbConnect();

  const body = await getExpensesTemplates();
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
