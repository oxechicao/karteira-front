import dbConnect from "@lib/mongoose/dbConnect";
import { newExpenseTemplate } from "@modules/expenseTemplates/features/create/createExpenseTemplateService";
import { getExpensesTemplates } from "@modules/expenseTemplates/features/list/listExpenseTemplateService";

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
