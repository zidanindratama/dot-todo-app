import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const activity = await prisma.activity.findUnique({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json(
      {
        activity: activity,
      },
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse("Error in fetching activities", {
      status: 500,
    });
  }
};

export const PUT = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const data = await request.json();

    if (!params.id) {
      return NextResponse.json(
        { error: "Activity ID is required" },
        { status: 400 }
      );
    }

    const updatedActivity = await prisma.activity.update({
      where: {
        id: params.id,
      },
      data,
    });

    return NextResponse.json(
      {
        message: "Activity is updated",
        activity: updatedActivity,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error in updating activity", details: error.message },
      { status: 500 }
    );
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    if (!params?.id) {
      return NextResponse.json(
        { error: "Activity ID is required" },
        { status: 400 }
      );
    }

    await prisma.activity.delete({
      where: { id: params.id },
    });

    return NextResponse.json(
      { message: "Activity is deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "Error in deleting activity",
        details: (error as Error).message,
      },
      { status: 500 }
    );
  }
};
