import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { Repositories } from 'src/constants';
import { ItensProcesso } from './itens-processo.entity';
import { Repository } from 'typeorm';
import {
  IItensProcessoRequest,
  IRequestItensProcesso,
} from 'src/common/responses/itens-processo-request.interface';
import { Processo } from '../processos.entity';

@Injectable()
export class ItensProcessoService {
  constructor(
    private readonly httpService: HttpService,
    @Inject(Repositories.ITENS_PROCESSO_REPOSITORY)
    private itensProcessoRepository: Repository<ItensProcesso>,
  ) {}
  public async buscarItensProcessos(processosExternos: Processo[]) {
    // const queries = processosExternos.map(async (processoExt) => {
    for (let i = 0; i < processosExternos.length; i++) {
      const processoExt = processosExternos[i];
      const itens = await this.getItensProcesso(processoExt);
      await this.updateItens(processoExt, itens);
    }
    // });
    // return Promise.all(queries);
  }

  public async getItensProcesso(processo: Processo) {
    let pagina = 1;
    let ultimaPagina = 1;
    let itens: IRequestItensProcesso[] = [];
    do {
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
    } while (ultimaPagina >= pagina);

    return itens;
  }
  public async updateItens(processo: Processo, itens: IRequestItensProcesso[]) {
    await this.itensProcessoRepository.delete({
      processo: { codigoLicitacao: processo.codigoLicitacao },
    });

    const itensParaSalvar = this.itensProcessoRepository.create(
      itens.map((i) => ({
        processo,
        quantidade: i.quantidade,
        valorReferencia: i.valorReferencia,
        descricao: i.descricao,
        codigoParticipacao: i.participacao.codigo,
        codigo: i.codigo,
      })),
    );

    return await this.itensProcessoRepository.save(itensParaSalvar);
  }
}
