import { Session } from "@/types";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  status?: string;
  short_title?: string;
}

const baseAPI = "https://api.entrylevel.net/test/sessions";
export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    if (req.method !== "GET") {
      return new Response(JSON.stringify({ message: "Invalid method" }), {
        status: 405,
      });
    }

    const response = await fetch(baseAPI);
    const params = Object.fromEntries(req.nextUrl.searchParams) as Params;
    let data = (await response.json()) as Session[];
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
