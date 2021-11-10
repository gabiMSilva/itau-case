import { CoverageType } from "../types/CoverageType";
import { QuestionType } from "../types/QuestionType";

export const fetchOfferQuestions = async () => {
  const questions = require("./mock/get_response_ofertas_questoes.json");

  const promise = new Promise<QuestionType[]>((resolve) => {
    setTimeout(() => {
      resolve(questions);
    }, 1000);
  });

  return await promise;
};

export const fetchCoverageOptions = async () => {
  const options = require("./mock/get_response_ofertas_residencial.json");

  const promise = new Promise<CoverageType[]>((resolve) => {
    setTimeout(() => {
      resolve(options.produtos[0].coberturas);
    }, 1000);
  });

  return await promise;
};
