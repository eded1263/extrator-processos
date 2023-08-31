import { Controller, Post } from '@nestjs/common';
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
}
