import { UserRights } from '../entities/user.entity';
export declare class CreateUserDto {
    username: string;
    password: string;
    userRole: UserRights;
    email: string;
}
