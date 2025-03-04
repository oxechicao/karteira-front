import saveExpense from "@modules/expense/repository/saveExpense"
import { NextApiRequest, NextApiResponse } from "next"

export const dinamic = 'force-dinamic'

export const GET = () => {
  return Response.json({ data: 'teste' })
}

export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log({ body: req.body })
  try {
    await saveExpense(req.body)
    return res.status(201);
  } catch (e) {
    console.log(req.body)
    console.log(e);
    return res.status(500);
  }
}