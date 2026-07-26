import { NextRequest, NextResponse } from "next/server";
import { sessions } from "@/lib/mockData";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const student = searchParams.get("student")?.trim().toLowerCase() ?? "";
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  const filteredSessions = sessions.filter((session) => {
    const matchesStudent =
      student.length === 0 ||
      session.student.toLowerCase().includes(student);
    const matchesFrom = !from || session.date >= from;
    const matchesTo = !to || session.date <= to;

    return matchesStudent && matchesFrom && matchesTo;
  });

  return NextResponse.json(
    {
      data: filteredSessions,
      total: filteredSessions.length,
    },
    { status: 200 },
  );
}
