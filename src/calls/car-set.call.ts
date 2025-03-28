import axios from "axios";
import { API_SERVER } from "@/config";
import { CarSet, CarSetWithoutIds } from "@/types";

export const getCarSet = async (setUrl: string) => {
  return axios
    .get<{ message: string; data: CarSet }>(`${API_SERVER}/car-set/${setUrl}`)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const getCarSets = async () => {
  return axios
    .get<{ message: string; data: CarSet[] }>(`${API_SERVER}/car-set`)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const createCarSet = async (data: CarSetWithoutIds) => {
  return axios
    .post<{ message: string; data: CarSet }>(`${API_SERVER}/car-set/`, data)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      throw error;
    });
};
