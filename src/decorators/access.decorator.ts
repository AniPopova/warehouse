import { SetMetadata, UseInterceptors } from '@nestjs/common';
import { UserRights } from 'src/user/entities/user.entity';
import { SerializeInterceptor, ClassConstructor } from 'src/interceptors/serialize.interceptor';


export const Access = (...roles: UserRights[]) => SetMetadata('access:user_roles', roles);

export const Serialize = (dto: ClassConstructor) => UseInterceptors(new SerializeInterceptor(dto));

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);