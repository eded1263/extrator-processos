import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableLockExecucao1693352402337
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          CREATE TABLE "lockExecucao"(
            emExecucao boolean 
          )  
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "lockExecucao"`);
  }
}
