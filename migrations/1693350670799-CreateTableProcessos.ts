import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableProcessos1693350670799 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE "processos" (
            codigoLicitacao integer NOT NULL UNIQUE,
            identificacao varchar(255) NOT NULL,
            numero varchar(255) NOT NULL,
            resumo text NOT NULL,
            codigoSituacaoEdital smallint NOT NULL,
            codigoStatus smallint NOT NULL,
            dataHoraInicioLances timestamp NOT NULL,
            PRIMARY KEY (codigoLicitacao)
        )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE "processos";
    `);
  }
}
