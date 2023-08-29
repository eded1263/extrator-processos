// dataHoraInicioLances (Data de início do processo)

import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Processo {
  @PrimaryColumn()
  codigoLicitacao: number;

  @Column()
  identificacao: string;

  @Column()
  numero: string;

  @Column()
  resumo: string;

  @Column()
  codigoSituacaoEdital: number;

  @Column()
  codigoStatus: number;

  @Column({ type: 'timestamp' })
  dataHoraInicioLances: Date;
}
