import axios from "axios";
import { API_SERVER } from "@/config";
import { CarSetAnswer, CarSetAnswerWithoutIds } from "@/types";

export const createCarSetAnswer = async (data: CarSetAnswerWithoutIds) => {
  return axios
    .post<{ message: string; data: CarSetAnswerWithoutIds }>(
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

export const deleteCarSetAnswers = async (carSetId: string) => {
  return axios
    .delete<{ message: string }>(
      `${API_SERVER}/car-set-answer/?carsetid=${carSetId}`
    )
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw error;
    });
};
