export declare enum UserRights {
    OWNER = "OWNER",
    OPERATOR = "OPERATOR",
    VIEWER = "VIEWER"
}
export declare class User {
    id: string;
    username: string;
    password: string;
    userRole: UserRights;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
