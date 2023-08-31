import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Processo } from '../processos.entity';

@Entity({ name: 'itensProcesso' })
export class ItensProcesso {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  descricao: string;

  @Column({ type: 'real', name: 'valor_referencia' })
  valorReferencia: number;

  @Column({ type: 'real' })
  quantidade: number;

  @Column({ name: 'codigo_participacao' })
  codigoParticipacao: number;

  @Column()
  codigo: number;

  @ManyToOne(() => Processo, (p: Processo) => p.itens)
  @JoinColumn({
    name: 'codigo_processo',
    referencedColumnName: 'codigoLicitacao',
  })
  processo: Processo;
}
