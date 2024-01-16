import { Logger } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
export declare class AuthService {
    private userService;
    private userRepository;
    private jwtService;
    private logger;
    constructor(userService: UserService, userRepository: Repository<User>, jwtService: JwtService, logger: Logger);
    signIn(name: string, pass: string): Promise<{
        access_token: string;
    }>;
    validateUser(email: string, password: string): Promise<User | null>;
}
