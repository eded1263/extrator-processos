import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableItensProcesso1693351475571
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE "itensProcesso"(
            id SERIAL NOT NULL UNIQUE,
            descricao text NOT NULL,
            valor_referencia decimal(10,2) NOT NULL,
            quantidade decimal(10,2) NOT NULL,
            codigo_participacao integer NOT NULL,
            codigo integer NOT NULL,
            codigo_processo integer NOT NULL,
            PRIMARY KEY (id),
            FOREIGN KEY (codigo_processo) REFERENCES "processos" (codigo_licitacao)
        )  
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "itensProcesso"`);
  }
}
