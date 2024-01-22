import { Logger } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { UserRepository } from 'src/user/user.repository';
export declare class AuthService {
    private userService;
    private readonly userRepository;
    private jwtService;
    private logger;
    constructor(userService: UserService, userRepository: UserRepository, jwtService: JwtService, logger: Logger);
    signup(email: string, password: string): Promise<void>;
    signIn(email: string, pass: string): Promise<{
        access_token: string;
    }>;
    validateUser(email: string, password: string): Promise<User | null>;
}
