import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import {
  IItensProcessoRequest,
  IRequestItensProcesso,
} from 'src/common/responses/itens-processo-request.interface';
import { Processo } from '../processos.entity';
import { ItensProcessoRepository } from './itens-processo.repository';

@Injectable()
export class ItensProcessoService {
  constructor(
    private readonly httpService: HttpService,
    private itensProcessoRepository: ItensProcessoRepository,
  ) {}
  public async buscarItensProcessos(processosExternos: Processo[]) {
    for (let i = 0; i < processosExternos.length; i++) {
      const processoExt = processosExternos[i];
      await this.getItensProcesso(processoExt);
    }
  }

  public async getItensProcesso(processo: Processo) {
    let pagina = 1;
    let ultimaPagina = 1;
    let itens: IRequestItensProcesso[] = [];
    do {
      try {
        const { data } =
          await this.httpService.axiosRef.get<IItensProcessoRequest>(
            `https://compras.api.portaldecompraspublicas.com.br/v2/licitacao/${processo.codigoLicitacao}/itens`,
            {
              params: {
                pagina,
              },
            },
          );
        pagina++;
        if (data.itens) {
          ultimaPagina = data.itens.pageCount;
          itens = [...itens, ...data.itens.result];
        }
      } catch (e) {
        // TODO: Analisar o porquê do erro 500
      }
    } while (ultimaPagina >= pagina);
    if (itens.length > 0) {
      await this.updateItens(processo, itens);
    }
    return itens;
  }
  public async updateItens(processo: Processo, itens: IRequestItensProcesso[]) {
    await this.itensProcessoRepository.deleteItens({
      processo,
    });

    await this.itensProcessoRepository.salvarItens(
      itens.map((i) => ({
        processo,
        quantidade: i.quantidade,
        valorReferencia: i.valorReferencia,
        descricao: i.descricao,
        codigoParticipacao: i.participacao.codigo,
        codigo: i.codigo,
      })),
    );
  }
}
