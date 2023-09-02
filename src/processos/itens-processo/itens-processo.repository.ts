import { Inject, Injectable } from '@nestjs/common';
import {
  DataSource,
  DeepPartial,
  FindOptionsWhere,
  QueryRunner,
} from 'typeorm';
import { DatabaseError } from 'src/common/exceptions/database-error.exception';
import { ItensProcesso } from './itens-processo.entity';

type IQueryFunction = (queryRunner: QueryRunner) => Promise<void>;

@Injectable()
export class ItensProcessoRepository {
  constructor(@Inject('DATA_SOURCE') private readonly dataSource: DataSource) {}

  private async executeQuery(query: IQueryFunction) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await query(queryRunner);
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      console.log(err);
      throw new DatabaseError();
    } finally {
      await queryRunner.release();
    }
  }

  public async deleteItens(where: FindOptionsWhere<ItensProcesso>) {
    return await this.executeQuery(async (queryRunner: QueryRunner) => {
      await queryRunner.manager.delete(ItensProcesso, where);
    });
  }

  public async salvarItens(itens: DeepPartial<ItensProcesso>[]) {
    console.log('cheguei aqui', itens.length);
    return await this.executeQuery(async (queryRunner: QueryRunner) => {
      const itensToSave = queryRunner.manager.create(ItensProcesso, itens);
      await queryRunner.manager.save(ItensProcesso, itensToSave);
    });
  }
}
