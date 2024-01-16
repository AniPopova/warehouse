import { ExceptionFilter, Catch, ArgumentsHost, UnauthorizedException } from '@nestjs/common';
import { Response } from 'express';

@Catch(UnauthorizedException)
export class AuthorizationExceptionFilter implements ExceptionFilter {
  catch(exception: UnauthorizedException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();

    const action = request.method; // Get the HTTP method (GET, POST, PUT, DELETE, etc.)

    let message = 'You are not authorized to perform this action.';

    if (action === 'POST') {
      message = 'You are not authorized to perform create.';
    } else if (action === 'PUT') {
      message = 'You are not authorized to perform update.';
    } else if (action === 'DELETE') {
      message = 'You are not authorized to perform delete.';
    }

    response.status(exception.getStatus()).json({
      statusCode: exception.getStatus(),
      message,
    });
  }
}