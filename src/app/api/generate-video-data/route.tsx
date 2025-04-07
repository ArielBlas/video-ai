import { inngest } from "@/inngest/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.json();
  const result = await inngest.send({
    name: "generate-video-data",
    data: {
      ...formData,
    },
  });
  return NextResponse.json({ result });
}
