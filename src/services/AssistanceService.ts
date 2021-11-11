import { AssistanceRequestType } from "../types/AssistanceType";
import axios from "./axios";

export const postAssistanceData = async (data: AssistanceRequestType) => {
  const response = await axios.post("/assistencias", data);

  return response;
};
