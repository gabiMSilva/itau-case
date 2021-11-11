import { AxiosResponse } from "axios";
import { CoverageType } from "../types/CoverageType";
import { QuestionType } from "../types/QuestionType";
import axios from "./axios";

export const fetchOfferQuestions = async () => {
  const response: AxiosResponse<QuestionType[]> = await axios.get("/questoes");
  return response.data;
};

type CoverageResponseType = {
  produtos: {
    coberturas: CoverageType[];
  }[];
};

export const fetchCoverageOptions = async () => {
  const response: AxiosResponse<CoverageResponseType> = await axios.get(
    "/coberturas"
  );

  return response.data.produtos[0].coberturas;
};
