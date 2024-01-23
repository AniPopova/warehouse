import { SetMetadata, UseInterceptors } from '@nestjs/common';
import { UserRights } from 'src/user/entities/user.entity';
import { SerializeInterceptor, ClassConstructor } from 'src/interceptors/serialize.interceptor';


export const Roles = (...roles: UserRights[]) => SetMetadata('roles', roles);

export const Serialize = (dto: ClassConstructor) => UseInterceptors(new SerializeInterceptor(dto));

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);