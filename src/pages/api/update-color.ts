import { NextApiRequest, NextApiResponse } from "next";

export default async function hanlder(
  request: NextApiRequest,
  response: NextApiResponse
) {
  console.log(request.body);

  return response.status(200).json({ ok: true });
}
