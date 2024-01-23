import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRights } from '../src/user/entities/user.entity';
import { Observable } from 'rxjs';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) { }

  canActivate(context: ExecutionContext) {
    const allowedRoles = this.reflector.get<UserRights[]>('access:roles', context.getHandler());

    // If no roles are specified, forbid access
    if (!allowedRoles || allowedRoles.length === 0) {
      return false;
    }

    const request = context.switchToHttp().getRequest();
    const userRole = request.user?.userRole;
    return allowedRoles.includes(userRole);
  }
}