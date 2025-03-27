import { create } from "zustand";
import { CarSet } from "@prisma/client";
import { Car } from "@/types";

type CarSetState = CarSet & {
  cars: Car[];
  setCars: (cars: Car[]) => void;
  setUrl: (url: string) => void;
  setId: (id: string) => void;
};

export const initialState = {
  id: "0",
  url: "",
  cars: [],
};

export const useCarSetStore = create<CarSetState>((set) => ({
  id: "0",
  url: "",
  cars: [],
  setCars: (cars) => set(() => ({ cars })),
  setUrl: (url) => set(() => ({ url })),
  setId: (id) => set(() => ({ id })),
}));
