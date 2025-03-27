import { create } from "zustand";
import { CarSet, Car } from "@prisma/client";

type State = {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
};

export const initialState = {
  isLoading: true,
};

export const useGlobalState = create<State>((set) => ({
  isLoading: true,
  setIsLoading: (isLoading: boolean) => set(() => ({ isLoading })),
}));
