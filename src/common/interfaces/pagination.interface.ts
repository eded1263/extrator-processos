export interface Pagination<T> {
  total: number;
  pagina: number;
  limite: number;
  totalPaginas: number;
  itens: T[];
}
