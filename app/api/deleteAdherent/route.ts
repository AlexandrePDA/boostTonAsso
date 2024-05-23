import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function DELETE(req: Request) {
  const body = await req.json();
  const { id } = body;
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }

  try {
    const deletedAdherent = await prisma.adherent.delete({
      where: {
        id,
      },
    });
    return new Response(JSON.stringify({ message: "Adherent deleted" }), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error deleting adherent" }),
      {
        status: 500,
      }
    );
  }

  // const userId = session?.user.id;
}
