import { Processo } from 'src/processos/processos.entity';

type IRequestProcesso = Omit<
  Processo,
  'dataCriacao' | 'dataAtualizacao' | 'dataExclusao'
>;

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
