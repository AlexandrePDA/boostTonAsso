import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import prisma from "@/lib/prisma";
import { sendEmailWelcome } from "@/lib/mail";

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json();
    const emailToLowerCase = email.toLowerCase();

    if (!emailToLowerCase || !password || !name)
      return NextResponse.json(
        { message: "Email et mot de passe requis" },
        { status: 400 }
      );
    if (password.length < 8)
      return NextResponse.json(
        { message: "Le mot de passe doit contenir au moins 8 caractères" },
        { status: 400 }
      );

    const response = await prisma.user.findUnique({
      where: { email: emailToLowerCase },
    });

    if (response) {
      return NextResponse.json(
        { message: "Email déjà utilisé" },
        { status: 400 }
      );
    }

    const hashedPassword = await hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email: emailToLowerCase,
        password: hashedPassword,
        nameAsso: name,
        createdAt: new Date(),
      },
    });
    await sendEmailWelcome(emailToLowerCase);
  } catch (e) {
    console.log(e);
  }

  return NextResponse.json({ message: "succes " });
}
