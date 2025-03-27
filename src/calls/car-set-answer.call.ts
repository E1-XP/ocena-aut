import axios from "axios";
import { API_SERVER } from "@/config";
import { CarSet, CarSetAnswer } from "@/types";

export const createCarSetAnswer = async (data: CarSetAnswer) => {
  return axios
    .post<{ message: string; data: CarSetAnswer }>(
      `${API_SERVER}/car-set-answer/`,
      data
    )
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const getCarSetAnswers = async (carSetId: string) => {
  return axios
    .get<{ message: string; data: CarSetAnswer[] }>(
      `${API_SERVER}/car-set-answer?carsetid=${carSetId}`
    )
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw error;
    });
};
