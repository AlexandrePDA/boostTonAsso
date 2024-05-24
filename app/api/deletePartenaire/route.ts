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
    const deletedPartenaire = await prisma.partenariats.delete({
      where: {
        id,
      },
    });
    return new Response(JSON.stringify({ message: "Partenaire deleted" }), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error deleting partenaire" }),
      {
        status: 500,
      }
    );
  }
}
