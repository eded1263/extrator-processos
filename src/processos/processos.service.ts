import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Processo } from './processos.entity';
import { Repositories } from 'src/constants';
import { ItensProcessoService } from './itens-processo/itens-processo.service';

@Injectable()
export class ProcessosService {
  constructor(
    @Inject(Repositories.PROCESSOS_REPOSITORY)
    private processosRepository: Repository<Processo>,
    @Inject(ItensProcessoService)
    private itensProcessoService: ItensProcessoService,
  ) {}

  public teste() {
    this.itensProcessoService.hello();
  }
}
