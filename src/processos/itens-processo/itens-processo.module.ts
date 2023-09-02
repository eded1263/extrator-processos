import { Module } from '@nestjs/common';
import { ItensProcessoRepository } from './itens-processo.repository';
import { ItensProcessoService } from './itens-processo.service';
import { DatabaseModule } from 'src/database/database.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  providers: [ItensProcessoRepository, ItensProcessoService],
  exports: [ItensProcessoService],
  imports: [DatabaseModule, HttpModule],
})
export class ItensProcessoModule {}
