import { UserRights } from "../entities/user.entity";
export declare class UserDto {
    id: string;
    name: string;
    userRole: UserRights;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
