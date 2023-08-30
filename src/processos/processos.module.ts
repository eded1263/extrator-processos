import { Module } from '@nestjs/common';
import { ProcessosController } from './processos.controller';
import { ProcessosService } from './processos.service';
import { processosProvider } from './processos.provider';
import { ItensProcessoModule } from './itens-processo/itens-processo.module';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [ProcessosController],
  providers: [...processosProvider, ProcessosService],
  imports: [ItensProcessoModule, DatabaseModule],
})
export class ProcessosModule {}
