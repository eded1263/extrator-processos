import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableLockExecucao1693406471546 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "lockExecucao" ADD COLUMN "data_hora" TIMESTAMP`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "lockExecucao" DROP COLUMN "data_hora"`,
    );
  }
}
