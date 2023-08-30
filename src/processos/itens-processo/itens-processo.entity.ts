import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Processo } from '../processos.entity';
import { BaseEntity } from 'src/common/entity/base.entity';

@Entity({ name: 'itensProcesso' })
export class ItensProcesso extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  descricao: string;

  @Column({ type: 'real' })
  valorReferencia: number;

  @Column({ type: 'real' })
  quantidade: number;

  @Column()
  codigoParticipacao: number;

  @Column()
  codigo: number;

  @ManyToOne(() => Processo, (p: Processo) => p.itens)
  @JoinColumn({
    name: 'codigoProcesso',
    referencedColumnName: 'codigoLicitacao',
  })
  processo: Processo;
}
