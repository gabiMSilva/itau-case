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

const PropertyService = {};

export default PropertyService;
