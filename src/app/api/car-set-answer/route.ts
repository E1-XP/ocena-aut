import { NextResponse, type NextRequest } from "next/server";
import { createEdgeRouter } from "next-connect";
import prisma from "../../../../prisma/client";
import { CarSetAnswer, CarSetAnswerWithoutIds } from "@/types";

interface RequestContext {
  params: {};
}

const router = createEdgeRouter<NextRequest, RequestContext>();

router.post(async (req, ctx) => {
  const data = (await req.json()) as CarSetAnswerWithoutIds;

  try {
    const carSet = await prisma.carSetAnswer.create({
      data: {
        carSetId: data.carSetId,
        carAnswers: {
          create: data.carAnswers.map((answer) => ({
            ...answer,
            carSetAnswerId: undefined,
            questions: { create: answer.questions },
          })),
        },
      },
      include: { carAnswers: { include: { questions: true } } },
    });

    return NextResponse.json(
      {
        message: "Car set answer created succesfully.",
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

router.get(async (req, ctx) => {
  const { searchParams } = new URL(req.url);
  const carSetId = searchParams.get("carsetid");

  try {
    if (!carSetId) throw new Error("Car set id param is not provided.");

    const carSets = await prisma.carSetAnswer.findMany({
      where: { carSetId },
      include: { carAnswers: { include: { questions: true } } },
    });

    return NextResponse.json(
      {
        message: "Car set answers found succesfully.",
        data: carSets,
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

router.patch(async (req, ctx) => {
  const data = (await req.json()) as CarSetAnswer;

  try {
    await prisma.carAnswer.deleteMany({
      where: {
        carSetAnswerId: data.id,
      },
    });

    const carSet = await prisma.carSetAnswer.update({
      where: { id: data.id },
      data: {
        carSetId: data.carSetId,
        carAnswers: {
          create: data.carAnswers.map((answer) => ({
            ...answer,
            carSetAnswerId: undefined,
            questions: {
              create: answer.questions.map((q) => ({ rating: q.rating })),
            },
          })),
        },
      },
      include: { carAnswers: { include: { questions: true } } },
    });

    return NextResponse.json(
      {
        message: "Car set answer created succesfully.",
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

router.delete(async (req, ctx) => {
  const { searchParams } = new URL(req.url);
  const carSetId = searchParams.get("carsetid");

  try {
    if (!carSetId) throw new Error("Car set id param is not provided.");

    const carSet = await prisma.carSetAnswer.deleteMany({
      where: { carSetId },
    });

    return NextResponse.json(
      {
        message: "Car set answer created succesfully.",
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

export async function POST(request: NextRequest, ctx: RequestContext) {
  return router.run(request, ctx) as Promise<Response>;
}

export async function PATCH(request: NextRequest, ctx: RequestContext) {
  return router.run(request, ctx) as Promise<Response>;
}

export async function DELETE(request: NextRequest, ctx: RequestContext) {
  return router.run(request, ctx) as Promise<Response>;
}
