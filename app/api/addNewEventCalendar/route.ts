import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  try {
    let { title, start, end } = await request.json();
    
    if (new Date(end) <= new Date(start)) {
      const temp = end;
      end = start;
      start = temp;
    }

    if (title === "" || start === "" || end === "")
      return NextResponse.json(
        { message: "error fields are empty" },
        { status: 400 }
      );

    const newAdherent = await prisma.calendar.create({
      data: {
        userId: session?.user.id,
        title,
        start,
        end,
        createdAt: new Date(),
      },
    });

    return NextResponse.json({ message: "succes " });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "error " }, { status: 400 });
  }
}
