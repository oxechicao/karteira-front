import type { NextRequest } from "next/server";
import { updateExpenseTemplate } from "@modules/expense-template/services/updateExpenseTemplate";
import { deleteExpenseTemplate } from "@modules/expense-template/services/deleteExpenseTemplate";
import { getByIdEditExpenseTemplate } from "@modules/expense-template/services/getByIdEditExpenseTemplate";
export const dynamic = "force-dynamic";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  const { id } = await params;
  const result = await getByIdEditExpenseTemplate(id);
  return Response.json(result);
};

export const PATCH = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  const { id } = await params;
  const body = await req.json();
  const result = await updateExpenseTemplate(id, body);
  return Response.json(result);
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  const { id } = await params;
  const result = await deleteExpenseTemplate(id);
  return Response.json(result);
};
