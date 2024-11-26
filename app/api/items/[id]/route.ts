import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const { searchParams } = new URL(request.url);
    const sort = searchParams.get("sort");

    const orderBy = (() => {
      switch (sort) {
        case "terbaru":
          return { created_at: "desc" as const };
        case "terlama":
          return { created_at: "asc" as const };
        case "a-z":
          return { name: "desc" as const };
        case "z-a":
          return { name: "asc" as const };
        default:
          return undefined;
      }
    })();

    const where =
      sort === "belum-selesai"
        ? { activityId: params.id, isCompleted: false }
        : { activityId: params.id };

    const items = await prisma.item.findMany({
      where,
      orderBy,
    });

    return NextResponse.json(
      {
        items,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "Error in fetching items",
        details: (error as Error).message,
      },
      { status: 500 }
    );
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
        { error: "Item ID is required" },
        { status: 400 }
      );
    }

    const updatedItem = await prisma.item.update({
      where: {
        id: params.id,
      },
      data,
    });

    return NextResponse.json(
      {
        message: "Item is updated",
        activity: updatedItem,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error in updating item", details: error.message },
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
        { error: "Item ID is required" },
        { status: 400 }
      );
    }

    await prisma.item.delete({
      where: { id: params.id },
    });

    return NextResponse.json(
      { message: "Item is deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "Error in deleting item",
        details: (error as Error).message,
      },
      { status: 500 }
    );
  }
};
