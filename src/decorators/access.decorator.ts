import { ExecutionContext, SetMetadata, UseInterceptors, createParamDecorator } from '@nestjs/common';
import { SerializeInterceptor, ClassConstructor } from 'src/interceptors/serialize.interceptor';
import { UserRights } from 'src/user/entities/user.entity';


export const Roles = (...roles: UserRights[]) => SetMetadata('roles', roles);

export const Role = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user.role; 
  },
);

export const Serialize = (dto: ClassConstructor) => UseInterceptors(new SerializeInterceptor(dto));

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);