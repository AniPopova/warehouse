// import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { UserRights } from '../src/user/entities/user.entity';
// import { Observable } from 'rxjs';

// @Injectable()
// export class UserRoleGuard implements CanActivate {
//   constructor(private readonly reflector: Reflector) { }

//   canActivate(context: ExecutionContext) {
//     const allowedRoles = this.reflector.get<UserRights[]>('access:roles', context.getHandler());

//     // If no roles are specified, forbid access
//     if (!allowedRoles || allowedRoles.length === 0) {
//       return false;
//     }

//     const request = context.switchToHttp().getRequest();
//     const userRole = request.user?.userRole;
//     return allowedRoles.includes(userRole);
//   }
// }

// import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { UserRights } from '../src/user/entities/user.entity';
// import { Observable } from 'rxjs';

// @Injectable()
// export class UserRoleGuard implements CanActivate {
//   constructor(private readonly reflector: Reflector) {}

//   canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
//     const allowedRoles = this.reflector.get<UserRights[]>('access:roles', context.getHandler());

//     if (!allowedRoles || allowedRoles.length === 0) {
//       return false;
//     }

//     const request = context.switchToHttp().getRequest();
//     const user = request.user;

//     // If no user or userRole is not defined, forbid access
//     if (!user || !user.userRole) {
//       return false;
//     }

//     if (!allowedRoles.includes(user.userRole)) {
//       return false;
//     }

//     // If additional permissions are required, check them here
//     const requiredPermissions = this.reflector.get<UserRights[]>('access:permissions', context.getHandler());

//     if (requiredPermissions && requiredPermissions.length > 0) {
//       const userPermissions = user.permissions || [];
//       console.log(userPermissions);

//       const hasRequiredPermissions = requiredPermissions.every(permission => userPermissions.includes(permission));

//       if (!hasRequiredPermissions) {
//         return false;
//       }
//     }

//     return true;
//   }
// }
// import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { UserRights } from '../src/user/entities/user.entity';
// import { Observable } from 'rxjs';

// @Injectable()
// export class UserRoleGuard implements CanActivate {
//   constructor(private readonly reflector: Reflector) {}

//   canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
//     const allowedRoles = this.reflector.get<UserRights[]>('roles', context.getHandler());

//     if (!allowedRoles || allowedRoles.length === 0) {
//       return false;
//     }

//     const request = context.switchToHttp().getRequest();
//     const user = request.user;

//     // If no user or userRole is not defined, forbid access
//     if (!user || !user.userRole) {
//       return false;
//     }

//     if (!allowedRoles.includes(user.userRole)) {
//       return false;
//     }

//     return true;
//   }
// }


import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRights } from '../user/entities/user.entity';
import { Observable } from 'rxjs';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const allowedRoles = this.reflector.get<UserRights[]>('roles', context.getHandler());

    if (!allowedRoles || allowedRoles.length === 0) {
      return false;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // If no user or userRole is not defined, forbid access
    if (!user || !user.userRole) {
      return false;
    }

    if (!allowedRoles.includes(user.userRole)) {
      return false;
    }

    // If additional permissions are required, check them here
    const requiredRoles = this.reflector.get<UserRights[]>('permissions', context.getHandler());

    if (requiredRoles && requiredRoles.length > 0) {
      const userRoles = user.roles || [];

      const hasRequiredRoles = requiredRoles.every(role => userRoles.includes(role));

      if (!hasRequiredRoles) {
        return false;
      }
    }

    return true;
  }
}
