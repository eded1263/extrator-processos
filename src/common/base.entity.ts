import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export class BaseEntity {
  @CreateDateColumn({ type: 'timestamp', select: false })
  dataCriacao: Date;

  @UpdateDateColumn({ type: 'timestamp', select: false })
  dataAtualizacao: Date;

  @DeleteDateColumn({ type: 'timestamp', select: false })
  dataExclusao: Date;
}
