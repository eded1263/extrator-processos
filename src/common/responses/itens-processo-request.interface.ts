import { ItensProcesso } from 'src/processos/itens-processo/itens-processo.entity';

type IRequestItensProcesso = Omit<
  ItensProcesso,
  'dataCriacao' | 'dataAtualizacao' | 'dataExclusao'
>;

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
