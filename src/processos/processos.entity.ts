import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { ItensProcesso } from './itens-processo/itens-processo.entity';
import { BaseEntity } from 'src/common/base.entity';

@Entity()
export class Processo extends BaseEntity {
  @PrimaryColumn()
  codigoLicitacao!: number;

  @Column()
  identificacao!: string;

  @Column()
  numero!: string;

  @Column()
  resumo!: string;

  @Column()
  codigoSituacaoEdital: number;

  @Column()
  codigoStatus!: number;

  @Column({ type: 'timestamp' })
  dataHoraInicioLances!: Date;

  @OneToMany(() => ItensProcesso, (i: ItensProcesso) => i.processo)
  itens: ItensProcesso[];
}
