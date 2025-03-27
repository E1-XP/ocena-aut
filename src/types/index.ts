import {
  CarSet as PrismaCarSet,
  Car as PrismaCar,
  CarAnswer as PrismaCarAnswer,
  CarSetAnswer as PrismaCarSetAnswer,
  QuestionAnswer,
  Question,
} from "@prisma/client";

export type Car = PrismaCar & { questions: Question[]; visited: boolean };
export type CarSet = PrismaCarSet & { cars: Car[] };

export type CarSetAnswer = Omit<PrismaCarSetAnswer, "id"> & {
  carAnswers: CarAnswer[];
};

export type CarAnswer = Omit<PrismaCarAnswer, "id"> & {
  questions: Omit<QuestionAnswer, "id" | "carAnswerId">[];
};
