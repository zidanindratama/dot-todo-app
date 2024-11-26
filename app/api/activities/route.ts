import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const activities = await prisma.activity.findMany();

    return NextResponse.json(
      {
        activities: activities,
      },
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse("Error in fetching activities", {
      status: 500,
    });
  }
};

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const newActivity = await prisma.activity.create({
      data: body,
    });

    return NextResponse.json(
      {
        message: "Activity is created",
        activity: newActivity,
      },
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse("Error in creating activity", {
      status: 500,
    });
  }
};
