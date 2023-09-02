import { Module } from '@nestjs/common';
import { ProcessosController } from './processos.controller';
import { ProcessosService } from './processos.service';
import { ItensProcessoModule } from './itens-processo/itens-processo.module';
import { DatabaseModule } from 'src/database/database.module';
import { HttpModule } from '@nestjs/axios';
import { ProcessosRepository } from './processos.repository';

@Module({
  controllers: [ProcessosController],
  providers: [ProcessosService, ProcessosRepository],
  imports: [ItensProcessoModule, DatabaseModule, HttpModule],
})
export class ProcessosModule {}
