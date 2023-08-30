import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { ProcessosModule } from './processos/processos.module';
import { ScheduleModule } from '@nestjs/schedule';
@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    ProcessosModule,
    ScheduleModule.forRoot(),
  ],
})
export class AppModule {}
