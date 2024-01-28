// import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { Observable } from 'rxjs';

// @Injectable()
// export class AuthGuard implements CanActivate {
//   constructor(private jwtService: JwtService) {}

//   canActivate(
//     context: ExecutionContext,
//   ): boolean | Promise<boolean> | Observable<boolean> {
//     const request = context.switchToHttp().getRequest();
//     return this.validateRequest(request);
//   }

//   async validateRequest(request: any): Promise<boolean> {
//     const token = this.extractTokenFromRequest(request);

//     if (!token) {
//       return false;
//     }

//     try {
//       const decoded = await this.jwtService.verifyAsync(token);
//       request.user = decoded; 
//       return true;
//     } catch (error) {
//       return false;
//     }
//   }

//   private extractTokenFromRequest(request: any): string | null {
//     const authHeader = request.headers.authorization;

//     if (!authHeader) {
//       return null;
//     }

//     const [bearer, token] = authHeader.split(' ');

//     if (bearer.toLowerCase() !== 'bearer' || !token) {
//       return null;
//     }

//     return token;
//   }
// }
// import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { Observable } from 'rxjs';
// import * as bcrypt from 'bcrypt';

// @Injectable()
// export class AuthGuard implements CanActivate {
//   constructor(private jwtService: JwtService) {}

//   canActivate(
//     context: ExecutionContext,
//   ): boolean | Promise<boolean> | Observable<boolean> {
//     const request = context.switchToHttp().getRequest();
//     return this.validateRequest(request);
//   }

//   async validateRequest(request: any): Promise<boolean> {
//     const token = this.extractTokenFromRequest(request);

//     if (!token) {
//       return false;
//     }

//     try {
//       const decoded = await this.jwtService.verifyAsync(token);
//       request.user = decoded; 
//       return true;
//     } catch (error) {
//       return false;
//     }
//   }

//   private extractTokenFromRequest(request: any): string | null {
//     const authHeader = request.headers.authorization;

//     if (!authHeader) {
//       return null;
//     }

//     const [bearer, token] = authHeader.split(' ');

//     if (bearer.toLowerCase() !== 'bearer' || !token) {
//       return null;
//     }

//     return token;
//   }

//   async hashPassword(password: string): Promise<string> {
//     const saltRounds = 10;
//     return bcrypt.hash(password, saltRounds);
//   }

//   async comparePasswords(plainTextPassword: string, hashedPassword: string): Promise<boolean> {
//     return bcrypt.compare(plainTextPassword, hashedPassword);
//   }
// }

import {
  CanActivate, ExecutionContext, Injectable, UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { AuthGuard as BaseAuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard extends BaseAuthGuard('jwt') implements CanActivate {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const { authorization }: any = request.headers;
      if (!authorization || authorization.trim() === '') {
        throw new UnauthorizedException('Please provide token');
      }
      const authToken = authorization.replace(/bearer/gim, '').trim();
      const resp = await this.authService.validateToken(authToken);
      request.decodedData = resp;
      return true;
    } catch (error) {
      console.log('auth error - ', error.message);
      throw new ForbiddenException(error.message || 'session expired! Please sign In');
    }
  }
}

