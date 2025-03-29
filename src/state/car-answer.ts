import { create } from "zustand";
import { CarAnswer } from "@/types";

type CarSetAnswersState = {
  cars: CarAnswer[];
  carSetId: string | null;
  carSetAnswerId: string | null;
  setCars: (cars: CarAnswer[]) => void;
  setCarSetId: (carSetId: string | null) => void;
  setCarSetAnswerId: (carSetAnswerId: string | null) => void;
};

export const initialState = {
  carSetId: null,
  carSetAnswerId: null,
  cars: [],
};

export const useCarSetAnswerStore = create<CarSetAnswersState>((set) => ({
  carSetId: null,
  carSetAnswerId: null, // used during answering to update carSetAnswer with new car after last question
  cars: [],
  setCars: (cars) => set(() => ({ cars })),
  setCarSetId: (carSetId) => set(() => ({ carSetId })),
  setCarSetAnswerId: (carSetAnswerId) => set(() => ({ carSetAnswerId })),
}));
