import { NextResponse, type NextRequest } from "next/server";
import { createEdgeRouter } from "next-connect";
import prisma from "../../../../prisma/client";

interface RequestContext {
  params: { url: string };
}

const router = createEdgeRouter<NextRequest, RequestContext>();

router.get(async (req, { params }) => {
  try {
    const carSet = await prisma.carSet.findMany({
      include: { cars: { include: { questions: true } } },
    });

    return NextResponse.json(
      {
        message: carSet
          ? "Car set data retrieved succesfully."
          : "No entries found.",
        data: carSet,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.log(error);
    const message =
      error instanceof Error ? error.message : "An error occurred";

    return NextResponse.json({ message }, { status: 400 });
  }
});

export async function GET(request: NextRequest, ctx: RequestContext) {
  return router.run(request, ctx) as Promise<Response>;
}
