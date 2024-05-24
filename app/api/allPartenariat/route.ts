import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }

  const userId = session?.user.id;

  try {
    const partenariat = await prisma.partenariats.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    console.log(partenariat);
    return new Response(JSON.stringify(partenariat), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Erreur lors de la récupération des adhérents" }),
      {
        status: 500,
      }
    );
  }
}
