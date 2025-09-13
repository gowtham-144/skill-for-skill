import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();
  const { skillId, teacherId, studentId, startTime, endTime, status } = body;

  if (!skillId || !teacherId || !startTime || !endTime) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const session = await prisma.session.create({
    data: {
      skillId,
      teacherId,
      studentId,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      status: status || "pending",
    },
  });

  return NextResponse.json(session);
}
