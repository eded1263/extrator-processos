import { Module } from '@nestjs/common';
import { ProcessosController } from './processos.controller';
import { ProcessosService } from './processos.service';
import { processosProvider } from './processos.provider';
import { ItensProcessoModule } from './itens-processo/itens-processo.module';
import { DatabaseModule } from 'src/database/database.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [ProcessosController],
  providers: [...processosProvider, ProcessosService],
  imports: [ItensProcessoModule, DatabaseModule, HttpModule],
  exports: [...processosProvider],
})
export class ProcessosModule {}
