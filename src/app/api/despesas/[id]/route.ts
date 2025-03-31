import { getByIdEditExpense } from "@modules/expense/features/edit/editExpense.service";
import { NextRequest } from "next/server";

export const GET = async (
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  const { id } = await params;
  const result = await getByIdEditExpense(id);
  return Response.json(result);
};
