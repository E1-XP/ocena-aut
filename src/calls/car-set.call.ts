import axios from "axios";
import { API_SERVER } from "@/config";
import { CarSet } from "@/types";

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
