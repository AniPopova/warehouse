import { UserService } from './user.service';
export declare class AuthService {
    private readonly userService;
    constructor(userService: UserService);
    signup(email: string, password: string): Promise<void>;
    signin(): void;
}
