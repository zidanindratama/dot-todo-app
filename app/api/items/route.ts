import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const newItem = await prisma.item.create({
      data: body,
    });

    return NextResponse.json(
      {
        message: "Item is created",
        activity: newItem,
      },
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse("Error in creating item", {
      status: 500,
    });
  }
};
