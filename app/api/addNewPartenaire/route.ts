import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  try {
    const { name, secteur, contact, commentaire } = await request.json();
    if (name === "")
      return NextResponse.json(
        { message: "error name is empty" },
        { status: 400 }
      );

    const newAdherent = await prisma.partenariats.create({
      data: {
        userId: session?.user.id,
        namePartenariat: name,
        secteur: secteur,
        contact: contact,
        commentaire: commentaire,
        createdAt: new Date(),
      },
    });

    return NextResponse.json({ message: "succes " });
  } catch {
    return NextResponse.json({ message: "error " }, { status: 400 });
  }
}
