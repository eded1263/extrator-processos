import { DataSource } from 'typeorm';
import { Processo } from './processos.entity';
import { Repositories } from 'src/constants';

export const processosProvider = [
  {
    provide: Repositories.PROCESSOS_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Processo),
    inject: ['DATA_SOURCE'],
  },
];
