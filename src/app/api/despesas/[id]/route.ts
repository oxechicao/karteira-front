import {
  getByIdEditExpense,
  updateExpenseById,
} from "@modules/expense/features/edit/editExpense.service";
import { NextRequest } from "next/server";

export const GET = async (
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  const { id } = await params;
  const result = await getByIdEditExpense(id);
  return Response.json(result);
};

export const PATCH = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  const { id } = await params;
  const body = await req.json();
  const result = await updateExpenseById(id, body);
  return Response.json(result);
};
