import { Repositories } from 'src/constants';
import { DataSource } from 'typeorm';
import { ItensProcesso } from './itens-processo.entity';

export const itensProcessoProvider = [
  {
    provide: Repositories.ITENS_PROCESSO_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ItensProcesso),
    inject: ['DATA_SOURCE'],
  },
];
