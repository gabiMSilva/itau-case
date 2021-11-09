export type ResponseType = {
  id_resposta: number;
  texto_resposta: string;
};

export type QuestionType = {
  id_questao: string;
  texto_questao: string;
  respostas: ResponseType[];
};
