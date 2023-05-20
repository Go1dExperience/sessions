
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let baseAPI = "https://api.entrylevel.net/test/sessions";
  if (req.method !== "GET") {
    return res.status(405).send({ message: "Invalid Method" });
  }
  const { short_title, status } = req.query;
  const params = new URLSearchParams();
  if (short_title) {
    params.append("short_title", short_title.toString());
  }
  if (status) {
    params.append("status", status.toString());
  }
  baseAPI += "?" + params.toString();
  const response = await fetch(baseAPI);
  const data = await response.json();

  return res.status(200).send(data);
}
