export type CoverageType = {
  id_cobertura: string;
  nome: string;
  descricao: string;
  resumo: string;
  cobertura_obrigatoria: boolean;
  identificador: string;
};

export type CoverageResultType = {
  id_cobertura: string;
  importancia_segurada: number;
  valor: number;
  franquia: number;
  franquia_percentual: number;
  texto_franquia: string;
  identificador: string;
};
