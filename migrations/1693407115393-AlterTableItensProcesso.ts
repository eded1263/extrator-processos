import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableItensProcesso1693407115393
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "itensProcesso" ADD COLUMN dataCriacao TIMESTAMP NOT NULL DEFAULT current_timestamp,
        ADD COLUMN dataAtualizacao TIMESTAMP,
        ADD COLUMN dataExclusao TIMESTAMP
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "itensProcesso" DROP COLUMN dataCriacao,
        DROP COLUMN dataAtualizacao,
        DROP COLUMN dataExclusao
    `);
  }
}
