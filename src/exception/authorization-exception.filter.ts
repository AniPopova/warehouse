import { ExceptionFilter, Catch, ArgumentsHost, UnauthorizedException } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from 'src/auth/auth.service'; 
import { UserRights } from 'src/user/entities/user.entity';

@Catch(UnauthorizedException)
export class AuthorizationExceptionFilter implements ExceptionFilter {
  constructor(private readonly authService: AuthService) {}

  async catch(exception: UnauthorizedException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();

    const action = request.method; 
    const token = request.headers.authorization?.replace('Bearer ', '');

    let message: string;

    try {
      const userRole = this.authService.getUserRoleFromToken(token);

      if (action === 'POST' && userRole !== UserRights.OWNER && userRole !== UserRights.OPERATOR) {
        message = 'You are not authorized to perform create.';
      } else if (action === 'PATCH' && userRole !== UserRights.OWNER && userRole !== UserRights.OPERATOR) {
        message = 'You are not authorized to perform update.';
      } else if (action === 'DELETE' && userRole !== UserRights.OWNER && userRole !== UserRights.OPERATOR) {
        message = 'You are not authorized to perform delete.';
      }
    } catch (error) {
      message = 'Invalid token';
    }

    response.status(exception.getStatus()).json({
      statusCode: exception.getStatus(),
      message,
    });
  }
}
