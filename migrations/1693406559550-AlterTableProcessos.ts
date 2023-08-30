import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableProcessos1693406559550 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "processos" ADD COLUMN dataCriacao TIMESTAMP NOT NULL DEFAULT current_timestamp,
        ADD COLUMN dataAtualizacao TIMESTAMP,
        ADD COLUMN dataExclusao TIMESTAMP
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "processos" DROP COLUMN dataCriacao,
        DROP COLUMN dataAtualizacao,
        DROP COLUMN dataExclusao
    `);
  }
}
