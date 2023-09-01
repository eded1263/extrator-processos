import { Controller, Get, Post, Query } from '@nestjs/common';
import { ProcessosService } from './processos.service';
import { Cron } from '@nestjs/schedule';
import { JobAlreadyRunningException } from 'src/common/exceptions/job-already-running.exception';
@Controller('processos')
export class ProcessosController {
  private lockMigracao = false;
  constructor(private readonly processosService: ProcessosService) {}

  @Post('/migrar')
  @Cron('0 */6 * * *')
  public async migrarProcessos() {
    if (this.lockMigracao) {
      throw new JobAlreadyRunningException();
    }
    console.log(`Execução iniciada às ${new Date().toISOString()}`);
    this.lockMigracao = true;
    await this.processosService.migrarProcessos();
    console.log(`Execução finalizada às ${new Date().toISOString()}`);
    this.lockMigracao = false;
    return { success: true };
  }

  @Get('')
  public async getProcessos(
    @Query('dataInicio') dataInicio: string,
    @Query('numero') numero: string,
    @Query('resumo') resumo: string,
    @Query('descricaoItem') descricaoItem: string,
    @Query('pagina') pagina: number,
    @Query('limite') limite: number,
  ) {
    return await this.processosService.getProcessos({
      dataInicio,
      numero,
      resumo,
      descricaoItem,
      pagina: pagina ? pagina : 1,
      limite: limite ? limite : 10,
    });
  }
}
