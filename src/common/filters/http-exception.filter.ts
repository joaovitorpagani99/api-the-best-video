import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { ResponseStatus } from 'src/utils/response.enum';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';

    // Logar a exceção
    //this.logger.error(
    //`HTTP Status: ${status} Error Message: ${JSON.stringify(message)}`,
    //exception instanceof Error ? exception.stack : '',
    //);

    response.status(status).json({
      type: ResponseStatus.ERROR,
      message: message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
