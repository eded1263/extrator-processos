export interface IRequestItensProcesso {
  descricao: string;
  valorReferencia: number;
  quantidade: number;
  participacao: { codigo: number };
  codigo: number;
}

export interface IItensProcessoRequest {
  itens: {
    result: IRequestItensProcesso[];
    offset: number;
    limit: number;
    total: number;
    pageCount: number;
    currentPage: number;
    nextPage: number | null;
    previousPage: number | null;
  };
}
