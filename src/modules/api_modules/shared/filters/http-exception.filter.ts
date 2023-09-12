import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { LoggingService } from '../../../logging/logging.service';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(
    private logger: LoggingService,
    private readonly httpAdapterHost: HttpAdapterHost,
  ) {}

  catch(exception: HttpException, host: ArgumentsHost): any {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let errorMessage = 'خطایی در سرور رخ داده است.';
    if (
      exception instanceof InternalServerErrorException ||
      httpStatus === HttpStatus.INTERNAL_SERVER_ERROR
    ) {
      errorMessage = 'خطای در سرور رخ داده است. لطفاً بعداً تلاش کنید.';
      this.logger.error(exception.message, {
        stack: exception.stack,
        name: exception.name,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    } else if (exception instanceof HttpException) {
      errorMessage = exception.message;
    }

    httpAdapter.reply(
      response,
      {
        statusCode: httpStatus,
        message: errorMessage,
        // name: exception.name,
        // timestamp: new Date().toISOString(),
        // path: request.url,
      },
      httpStatus,
    );
  }
}
