import { Injectable, Inject } from '@nestjs/common';
import { In, Not, Repository } from 'typeorm';
import { Processo } from './processos.entity';
import { Repositories } from 'src/constants';
import { ItensProcessoService } from './itens-processo/itens-processo.service';
import { HttpService } from '@nestjs/axios';
import {
  IProcessosRequest,
  IRequestProcesso,
} from 'src/common/responses/processos-request.interface';

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
      await this.getProcessos(processosExternos),
    );
    await this.deletarProcessosAntigos(processosExternos);
  }

  private async buscarProcessosExternos() {
    let pagina = 1;
    let ultimaPagina = 2;
    let processos: IRequestProcesso[] = [];
    const dataInicial = new Date();
    const dataFinal = new Date();
    dataFinal.setDate(dataInicial.getDate() + 30);
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
    await this.processosRepository.upsert(processosToUpsert, [
      'codigoLicitacao',
    ]);
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

  private getProcessos(processosExternos: IRequestProcesso[]) {
    return this.processosRepository.find({
      where: {
        codigoLicitacao: In(this.getProcessosExternosIds(processosExternos)),
      },
    });
  }
}
