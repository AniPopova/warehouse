import { UserRights } from '../entities/user.entity';
export declare class CreateUserDto {
    name: string;
    password: string;
    userRole: UserRights;
    email: string;
}
