import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableProcessos1693350670799 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE "processos" (
            codigo_licitacao integer NOT NULL UNIQUE,
            identificacao varchar(255) NOT NULL,
            numero varchar(255) NOT NULL,
            resumo text NOT NULL,
            codigo_situacao_edital smallint NOT NULL,
            codigo_status smallint NOT NULL,
            data_hora_inicio_lances timestamp NOT NULL,
            PRIMARY KEY (codigo_licitacao)
        )
    `);
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE "processos";
    `);
  }
}
