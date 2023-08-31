export interface IRequestProcesso {
  codigoLicitacao: number;
  identificacao: string;
  numero: string;
  resumo: string;
  codigoSituacaoEdital: number;
  status: { codigo: number };
  dataHoraInicioLances: Date;
}

export interface IProcessosRequest {
  result: IRequestProcesso[];
  offset: number;
  limit: number;
  total: number;
  pageCount: number;
  currentPage: number;
  nextPage: number | null;
  previousPage: number | null;
}
