import { UserRights } from 'src/user/entities/user.entity';
import { ClassConstructor } from 'src/interceptors/serialize.interceptor';
export declare const Roles: (...roles: UserRights[]) => import("@nestjs/common").CustomDecorator<string>;
export declare const Serialize: (dto: ClassConstructor) => MethodDecorator & ClassDecorator;
export declare const IS_PUBLIC_KEY = "isPublic";
export declare const Public: () => import("@nestjs/common").CustomDecorator<string>;
