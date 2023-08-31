import { Controller, Post } from '@nestjs/common';
import { ProcessosService } from './processos.service';

@Controller('processos')
export class ProcessosController {
  constructor(private readonly processosService: ProcessosService) {}

  @Post('/migrar')
  public async migrarProcessos() {
    console.log('Execução iniciada');
    await this.processosService.migrarProcessos();
    console.log('Execução finalizada');
  }
}
