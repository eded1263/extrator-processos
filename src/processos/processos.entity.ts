import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { ItensProcesso } from './itens-processo/itens-processo.entity';
import { BaseEntity } from 'src/common/entity/base.entity';

@Entity({ name: 'processos' })
export class Processo extends BaseEntity {
  @PrimaryColumn({ name: 'codigo_licitacao' })
  codigoLicitacao!: number;

  @Column()
  identificacao!: string;

  @Column()
  numero!: string;

  @Column()
  resumo!: string;

  @Column({ name: 'codigo_situacao_edital' })
  codigoSituacaoEdital: number;

  @Column({ name: 'codigo_status' })
  codigoStatus!: number;

  @Column({ type: 'timestamp', name: 'data_hora_inicio_lances' })
  dataHoraInicioLances!: Date;

  @OneToMany(() => ItensProcesso, (i: ItensProcesso) => i.processo)
  itens: ItensProcesso[];
}
