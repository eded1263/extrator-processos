import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { ProcessosModule } from './processos/processos.module';
@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, ProcessosModule],
})
export class AppModule {}
