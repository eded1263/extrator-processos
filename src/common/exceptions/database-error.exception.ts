import { HttpException, HttpStatus } from '@nestjs/common';

export class DatabaseError extends HttpException {
  constructor() {
    super('Erro no banco de dados', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
