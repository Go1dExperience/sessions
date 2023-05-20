import { Session } from "@/types";
import { NextApiRequest, NextApiResponse } from "next";

interface Params {
  status?: string;
  short_title?: string;
}

export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  let baseAPI = "https://api.entrylevel.net/test/sessions";
  try {
    if (req.method !== "GET") {
      return res.status(405).send({ message: "Invalid Method" });
    }

    const response = await fetch(baseAPI);
    const params = Object.fromEntries(
      new URLSearchParams(req.url?.split("?")[1])
    ) as Params;
    let data = (await response.json()) as Session[];
    console.log({ params });
    if (params.status) {
      data = data.filter(session => session.status === params.status);
    }
    if (params.short_title) {
      data = data.filter(
        session => session.program[0].short_title === params.short_title
      );
    }
    // @ts-ignore
    data.sort((a, b) => new Date(b.start_date) - new Date(a.start_date));
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.log({ error });
    return new Response("Internal server error", {
      status: 500,
    });
  }
};
