import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET a single session by id
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const sessionId = params.id; // keep as string
  const session = await prisma.session.findUnique({
    where: { id: sessionId },
    include: { skill: true, student: true },
  });
  if (!session)
    return NextResponse.json({ error: "Session not found" }, { status: 404 });
  return NextResponse.json(session);
}

// UPDATE a session
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const sessionId = params.id; // string
  const data = await req.json();
  const updated = await prisma.session.update({
    where: { id: sessionId },
    data,
  });
  return NextResponse.json(updated);
}

// DELETE a session
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const sessionId = params.id; // string
  await prisma.session.delete({ where: { id: sessionId } });
  return NextResponse.json({ message: "Session deleted" });
}
