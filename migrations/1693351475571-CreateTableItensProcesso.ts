import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableItensProcesso1693351475571
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE "itensProcesso"(
            id SERIAL NOT NULL UNIQUE,
            descricao varchar(255) NOT NULL,
            valorReferencia real NOT NULL,
            quantidade real NOT NULL,
            codigoParticipacao smallint NOT NULL,
            codigo smallint NOT NULL,
            codigoProcesso integer NOT NULL,
            PRIMARY KEY (id),
            FOREIGN KEY (codigoProcesso) REFERENCES "processos" (codigoLicitacao)
        )  
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "itensProcesso"`);
  }
}
