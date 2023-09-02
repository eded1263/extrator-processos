import { Inject, Injectable } from '@nestjs/common';
import { IRequestProcesso } from 'src/common/responses/processos-request.interface';
import {
  DataSource,
  FindManyOptions,
  FindOptionsWhere,
  QueryRunner,
  SelectQueryBuilder,
} from 'typeorm';
import { Processo } from './processos.entity';
import { DatabaseError } from 'src/common/exceptions/database-error.exception';
type IQueryFunction = (queryRunner: QueryRunner) => Promise<void>;
@Injectable()
export class ProcessosRepository {
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

  public async findProcessos(
    findOptions: FindManyOptions<Processo>,
  ): Promise<Processo[]> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    let result: Processo[];
    try {
      result = await queryRunner.manager.find(Processo, findOptions);
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      console.log(err);
      throw new DatabaseError();
    } finally {
      await queryRunner.release();
    }
    return result;
  }

  public async upsertProcessos(processosExternos: IRequestProcesso[]) {
    const processosToUpsert: Partial<Processo>[] = processosExternos.map(
      (processoExt) => ({
        codigoLicitacao: processoExt.codigoLicitacao,
        identificacao: processoExt.identificacao,
        numero: processoExt.numero,
        resumo: processoExt.resumo,
        codigoSituacaoEdital: processoExt.codigoSituacaoEdital,
        codigoStatus: processoExt.status.codigo,
        dataHoraInicioLances: processoExt.dataHoraInicioLances,
      }),
    );
    return this.executeQuery(async (queryRunner: QueryRunner) => {
      await Promise.all(
        processosToUpsert.map(
          async (p) =>
            await queryRunner.manager.upsert(Processo, p, ['codigoLicitacao']),
        ),
      );
    });
  }
  public async deleteProcesso(where: FindOptionsWhere<Processo>) {
    return await this.executeQuery(async (queryRunner: QueryRunner) => {
      await queryRunner.manager.softDelete(Processo, where);
    });
  }

  public async getProcessosWithCount(
    aplicarFiltros: (
      query: SelectQueryBuilder<Processo>,
    ) => SelectQueryBuilder<Processo>,
    paginacao: { skip: number; take: number },
  ) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    let itens: Processo[];
    let total: number;
    try {
      let query = queryRunner.manager.createQueryBuilder(Processo, 'pr');
      query.leftJoinAndSelect(
        'pr.itens',
        'i',
        'pr.codigo_licitacao = i.codigo_processo',
      );
      query = aplicarFiltros(query);
      const countQuery = query.clone();
      itens = await query.skip(paginacao.skip).take(paginacao.take).getMany();
      total = await countQuery.getCount();
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new DatabaseError();
    } finally {
      await queryRunner.release();
    }
    return { itens, total };
  }
}
