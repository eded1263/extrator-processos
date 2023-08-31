import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export class BaseEntity {
  @CreateDateColumn({ type: 'timestamp', select: false, name: 'data_criacao' })
  dataCriacao: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    select: false,
    name: 'data_atualizacao',
  })
  dataAtualizacao: Date;

  @DeleteDateColumn({ type: 'timestamp', select: false, name: 'data_exclusao' })
  dataExclusao: Date;
}
