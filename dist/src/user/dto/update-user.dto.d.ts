import { CreateUserDto } from './create-user.dto';
import { UserRights } from '../entities/user.entity';
declare const UpdateUserDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateUserDto>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
    name?: string;
    password?: string;
    userRole?: UserRights;
    email?: string;
}
export {};
