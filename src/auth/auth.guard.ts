// import {
//   CanActivate, ExecutionContext, Injectable, UnauthorizedException,
//   ForbiddenException,
// } from '@nestjs/common';
// import { AuthGuard as BaseAuthGuard } from '@nestjs/passport';
// import { AuthService } from './auth.service';
// import { IS_PUBLIC_KEY } from 'src/decorators/access.decorator';
// import { Reflector } from '@nestjs/core';
// import * as bcrypt from 'bcrypt';
// import { JwtService } from '@nestjs/jwt';
// import { Request } from 'express';

// @Injectable()
// export class AuthGuard extends BaseAuthGuard('jwt') implements CanActivate {
//   constructor(private readonly authService: AuthService, 
//     private readonly reflector: Reflector,
//     private readonly jwtService: JwtService) {
//     super();
//   }
//   async canActivate(context: ExecutionContext): Promise<boolean>  {
//     try {
//       const isPublic = this.reflector.get<boolean>(
//         IS_PUBLIC_KEY,
//         context.getHandler(),
//       );

//       if (isPublic) {
//         return true;
//       }

//       const request = context.switchToHttp().getRequest();
//       const { authorization }: any = request.headers;

//       if (!authorization || authorization.trim() === '') {
//         throw new UnauthorizedException('Please provide token');
//       }

//       const authToken = authorization.replace(/bearer/gim, '').trim();
//       const resp = await this.authService.validateToken(authToken);    

//       request.decodedData = resp;
//       request.user = resp; 
//       return true;
//     } catch (error) {
//       console.log('auth error - ', error.message);
//       throw new ForbiddenException(error.message || 'Session expired! Please sign in');
//     }
//   }

// import {
//   CanActivate,
//   ExecutionContext,
//   Injectable,
//   UnauthorizedException,
//   ForbiddenException,
// } from '@nestjs/common';
// import { AuthGuard as BaseAuthGuard } from '@nestjs/passport';
// import { AuthService } from './auth.service';
// import { IS_PUBLIC_KEY } from 'src/decorators/access.decorator';
// import { Reflector } from '@nestjs/core';
// import * as bcrypt from 'bcrypt';
// import { JwtService } from '@nestjs/jwt';
// import { Request } from 'express';

// @Injectable()
// export class AuthGuard extends BaseAuthGuard('jwt') implements CanActivate {
//   constructor(
//     private readonly authService: AuthService,
//     private readonly reflector: Reflector,
//     private readonly jwtService: JwtService,
//   ) {
//     super();
//   }

//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     try {
//       const isPublic = this.reflector.get<boolean>(
//         IS_PUBLIC_KEY,
//         context.getHandler(),
//       );

//       if (isPublic) {
//         return true;
//       }

//       const request = context.switchToHttp().getRequest();
//       const { authorization }: any = request.headers;

//       if (!authorization || authorization.trim() === '') {
//         throw new UnauthorizedException('Please provide token');
//       }

//       const authToken = authorization.replace(/bearer/gim, '').trim();
//       const decodedUser = await this.authService.validateToken(authToken);

//       request.user = decodedUser;
//       return true;
//     } catch (error) {
//       console.log('auth error - ', error.message);
//       throw new ForbiddenException(
//         error.message || 'Session expired! Please sign in',
//       );
//     }
//   }


import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { AuthGuard as BaseAuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { IS_PUBLIC_KEY } from 'src/decorators/access.decorator';
import { Reflector } from '@nestjs/core';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard extends BaseAuthGuard('jwt') implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const isPublic = this.reflector.get<boolean>(
        IS_PUBLIC_KEY,
        context.getHandler(),
      );

      if (isPublic) {
        return true;
      }

      const request = context.switchToHttp().getRequest();
      const { authorization }: any = request.headers;

      if (!authorization || authorization.trim() === '') {
        throw new UnauthorizedException('Please provide token');
      }

      const authToken = authorization.replace(/bearer/gim, '').trim();
      const resp = await this.authService.validateToken(authToken);

      request.user = resp; // Set the user object including 'role'
      return true;
    } catch (error) {
      console.log('auth error - ', error.message);
      throw new ForbiddenException(
        error.message || 'Session expired! Please sign in',
      );
    }
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
      console.error(error.message);
      return false;
    }
  }

  private extractTokenFromRequest(request: Request): string {
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

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  async comparePasswords(plainTextPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainTextPassword, hashedPassword);
  }
}
