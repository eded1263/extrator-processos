import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableProcessos1693406559550 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "processos" ADD COLUMN data_criacao TIMESTAMP NOT NULL DEFAULT current_timestamp,
        ADD COLUMN data_atualizacao TIMESTAMP,
        ADD COLUMN data_exclusao TIMESTAMP
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "processos" DROP COLUMN data_criacao,
        DROP COLUMN data_atualizacao,
        DROP COLUMN data_exclusao
    `);
  }
}
