import { Injectable, Inject } from '@nestjs/common';
import {
  In,
  MoreThanOrEqual,
  Not,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';
import { Processo } from './processos.entity';
import { Repositories } from 'src/constants';
import { ItensProcessoService } from './itens-processo/itens-processo.service';
import { HttpService } from '@nestjs/axios';
import {
  IProcessosRequest,
  IRequestProcesso,
} from 'src/common/responses/processos-request.interface';
import { IQueryProcessos } from './interfaces/query-processos.interface';

@Injectable()
export class ProcessosService {
  constructor(
    @Inject(Repositories.PROCESSOS_REPOSITORY)
    private processosRepository: Repository<Processo>,
    @Inject(ItensProcessoService)
    private itensProcessoService: ItensProcessoService,
    private readonly httpService: HttpService,
  ) {}

  public async migrarProcessos() {
    const processosExternos = await this.buscarProcessosExternos();
    await this.upsertProcessos(processosExternos);
    await this.itensProcessoService.buscarItensProcessos(
      await this.listProcessos(processosExternos),
    );
    await this.deletarProcessosAntigos(processosExternos);
  }

  private async buscarProcessosExternos() {
    let pagina = 1;
    let ultimaPagina = 2;
    let processos: IRequestProcesso[] = [];
    const dataInicial = new Date();
    const dataFinal = new Date();
    dataFinal.setDate(dataInicial.getDate() + 29);
    do {
      const { data } = await this.httpService.axiosRef.get<IProcessosRequest>(
        'https://compras.api.portaldecompraspublicas.com.br/v2/licitacao/processos',
        {
          params: {
            pagina,
            dataInicial: dataInicial.toISOString(),
            dataFinal: dataFinal.toISOString(),
            tipoData: 1, // REF: parametro utilizado nas requests do site
          },
        },
      );
      processos = [...processos, ...data.result];
      pagina++;
      ultimaPagina = data.pageCount;
    } while (ultimaPagina >= pagina);

    return processos;
  }

  private async upsertProcessos(processosExternos: IRequestProcesso[]) {
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
    console.log('cheguei aqui');
    await Promise.all(
      processosToUpsert.map(
        async (p) =>
          await this.processosRepository.upsert(p, ['codigoLicitacao']),
      ),
    );
    console.log('cheguei aqui no final');
  }

  private getProcessosExternosIds(processosExternos: IRequestProcesso[]) {
    return processosExternos.map((p) => p.codigoLicitacao);
  }

  private async deletarProcessosAntigos(processosExternos: IRequestProcesso[]) {
    const idsProcessos = this.getProcessosExternosIds(processosExternos);
    await this.processosRepository.softDelete({
      codigoLicitacao: Not(In(idsProcessos)),
    });
  }

  private listProcessos(processosExternos: IRequestProcesso[]) {
    return this.processosRepository.find({
      where: {
        codigoLicitacao: In(this.getProcessosExternosIds(processosExternos)),
      },
    });
  }

  public async getProcessos(opcoes: IQueryProcessos) {
    let query = this.processosRepository.createQueryBuilder('pr');
    query.leftJoinAndSelect(
      'pr.itens',
      'i',
      'pr.codigo_licitacao = i.codigo_processo',
    );
    query = this.filtrar(query, opcoes);

    const countQuery = query.clone();
    const total = await countQuery.getCount();
    const processos = await query
      .skip((opcoes.pagina - 1) * opcoes.limite)
      .take(opcoes.limite)
      .getMany();

    return {
      processos,
      total,
      pagina: opcoes.pagina,
      limite: opcoes.limite,
      totalPaginas: Math.ceil(total / opcoes.limite),
    };
  }
  private filtrar(
    query: SelectQueryBuilder<Processo>,
    opcoes: IQueryProcessos,
  ) {
    if (opcoes.resumo) {
      query.andWhere('pr.resumo ILIKE (:resumo)', {
        resumo: `%${opcoes.resumo}%`,
      });
    }
    if (opcoes.numero) {
      query.andWhere('pr.numero ILIKE (:numero)', {
        numero: `%${opcoes.numero}%`,
      });
    }
    if (opcoes.dataInicio) {
      query.andWhere({
        dataHoraInicioLances: MoreThanOrEqual(new Date(opcoes.dataInicio)),
      });
    }
    if (opcoes.descricaoItem) {
      query.andWhere('i.descricao ILIKE (:descricaoItem)', {
        descricaoItem: `%${opcoes.descricaoItem}%`,
      });
    }
    return query;
  }
}
