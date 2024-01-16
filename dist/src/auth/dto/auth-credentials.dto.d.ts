import { UserRights } from "src/user/entities/user.entity";
export declare class AuthCredentialsDto {
    name: string;
    password: string;
    userRole: UserRights;
    email: string;
}
