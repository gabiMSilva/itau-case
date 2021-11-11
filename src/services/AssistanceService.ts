import { RequestAssistanceType } from "../types/AssistanceType";
import axios from "./axios";

export const postAssistanceData = async (data: RequestAssistanceType) => {
  const response = await axios.post("/assistencias", data);

  return response?.data;
};
