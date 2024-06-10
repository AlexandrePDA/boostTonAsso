import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  try {
    let { title, start, end, id } = await request.json();

    if (new Date(end) <= new Date(start)) {
      const temp = end;
      end = start;
      start = temp;
    }

    if (title === "" || start === "" || end === "" || id === "")
      return NextResponse.json(
        { message: "error fields are empty" },
        { status: 400 }
      );

    const modifyEventCalendar = await prisma.calendar.update({
      where: {
        id,
        userId: session?.user.id,
      },
      data: {
        title,
        start,
        end,
        createdAt: new Date(),
      },
    });

    return NextResponse.json({ message: "succès " });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "error " }, { status: 400 });
  }
}
