import { create } from "zustand";
import { CarAnswer } from "@/types";

type CarSetAnswersState = {
  cars: CarAnswer[];
  carSetId: string | null;
  setCars: (cars: CarAnswer[]) => void;
  setCarSetId: (carSetId: string | null) => void;
};

export const initialState = {
  carSetId: null,
  cars: [],
};

export const useCarSetAnswerStore = create<CarSetAnswersState>((set) => ({
  carSetId: null,
  cars: [],
  setCars: (cars) => set(() => ({ cars })),
  setCarSetId: (carSetId) => set(() => ({ carSetId })),
}));
