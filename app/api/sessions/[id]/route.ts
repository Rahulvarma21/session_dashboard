import { NextResponse } from "next/server";
import { sessions } from "@/lib/mockData";

interface SessionRouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(_: Request, context: SessionRouteContext) {
  const { id } = await context.params;
  const session = sessions.find((item) => item.id === id);

  if (!session) {
    return NextResponse.json(
      { error: "Session not found" },
      { status: 404 },
    );
  }

  return NextResponse.json({ data: session }, { status: 200 });
}
