import {
  CarSet as PrismaCarSet,
  Car as PrismaCar,
  CarAnswer as PrismaCarAnswer,
  CarSetAnswer as PrismaCarSetAnswer,
  QuestionAnswer,
  Question,
} from "@prisma/client";

export type Car = PrismaCar & {
  questions: Question[];
  visited: boolean;
};

export type CarWithoutIds = Omit<PrismaCar, "id"> & {
  questions: Omit<Question, "id">[];
  visited: boolean;
};

export type CarSet = PrismaCarSet & {
  cars: Car[];
};

export type CarSetWithoutIds = Omit<PrismaCarSet, "id"> & {
  cars: CarWithoutIds[];
};

export type CarSetAnswer = PrismaCarSetAnswer & {
  carAnswers: CarAnswer[];
};

export type CarSetAnswerWithoutIds = Omit<PrismaCarSetAnswer, "id"> & {
  carAnswers: CarAnswerwithoutIds[];
};

export type CarAnswer = PrismaCarAnswer & {
  questions: QuestionAnswer[];
};

export type CarAnswerwithoutIds = Omit<PrismaCarAnswer, "id"> & {
  questions: Omit<QuestionAnswer, "id" | "carAnswerId">[];
};
