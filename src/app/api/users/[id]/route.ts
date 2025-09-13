import prisma from "@/lib/prisma";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const user = await prisma.user.findUnique({
      where: { id }  // <-- use Prisma's 'where' filter
    });

    if (!user) return new Response("User not found", { status: 404 });

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
}

