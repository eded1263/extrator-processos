import { Module } from '@nestjs/common';
import { itensProcessoProvider } from './itens-processo.provider';
import { ItensProcessoService } from './itens-processo.service';
import { DatabaseModule } from 'src/database/database.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  providers: [...itensProcessoProvider, ItensProcessoService],
  exports: [ItensProcessoService],
  imports: [DatabaseModule, HttpModule],
})
export class ItensProcessoModule {}
