import { AddressType } from "./PofileType";

export type AssistanceRequestType = {
  id_assistencia: string;
};

export type CoverageRequestType = {
  id_cobertura: string;
  importancia_segurada: number;
};
export type ContactRequestType = {
  valor: string;
  tipo: string;
};
export type QuestionRequestType = {
  id_questao: string;
  resposta: string;
};

export type RequestAssistanceType = {
  item_risco: {
    imovel: {
      endereco: AddressType & {
        numero: string;
        pais: string;
      };
    };
  };
  oferta: {
    id_oferta: string;
    produtos: [
      {
        assistencias: AssistanceRequestType[];
        coberturas: CoverageRequestType[];
        id_produto: string;
        importancia_base: number;
      }
    ];
  };
  proponente: {
    contatos: ContactRequestType[];
    cpf: string;
    data_nascimento: number;
    nome: string;
  };
  questoes: QuestionRequestType[];
};
