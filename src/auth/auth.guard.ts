import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  async validateRequest(request: any): Promise<boolean> {
    const token = this.extractTokenFromRequest(request);

    if (!token) {
      return false;
    }

    try {
      const decoded = await this.jwtService.verifyAsync(token);
      request.user = decoded; 
      return true;
    } catch (error) {
      return false;
    }
  }

  private extractTokenFromRequest(request: any): string | null {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      return null;
    }

    const [bearer, token] = authHeader.split(' ');

    if (bearer.toLowerCase() !== 'bearer' || !token) {
      return null;
    }

    return token;
  }
}
