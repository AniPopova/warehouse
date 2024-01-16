
// import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { UserRights } from 'src/user/entities/user.entity';

// @Injectable()
// export class UserRoleGuard implements CanActivate {
//   constructor(private reflector: Reflector) {}

//   canActivate(context: ExecutionContext): boolean {
//     const roles = this.reflector.get<UserRights[]>('user_roles', context.getHandler());

//     if (!roles) {
//       return false;
//     }

//     const request = context.switchToHttp().getRequest();
//     const user = request.user;
//     const hasRequiredRoles = user && roles.some((requiredRole) => user.userRole === requiredRole);

//     return hasRequiredRoles;
//   }
// }
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRights } from './entities/user.entity';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const allowedRoles = this.reflector.get<UserRights[]>('access:roles', context.getHandler());

    // If no roles are specified, forbid access
    if (!allowedRoles || allowedRoles.length === 0) {
      return false;
    }

    // Check if the user has one of the allowed roles
    const request = context.switchToHttp().getRequest();
    const userRole = request.user?.user_roles; // Replace with the actual property holding the user's role

    return allowedRoles.includes(userRole);
  }
}