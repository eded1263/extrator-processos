import { HttpService } from '@nestjs/axios';
import { Controller } from '@nestjs/common';

@Controller('processos')
export class ProcessosController {
  constructor(private readonly httpService: HttpService) {}
}
