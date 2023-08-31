import { HttpException, HttpStatus } from '@nestjs/common';

export class JobAlreadyRunningException extends HttpException {
  constructor() {
    super('Job em andamento', HttpStatus.FORBIDDEN);
  }
}
