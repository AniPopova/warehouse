import { Logger } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/user/user.repository';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
export declare class AuthService {
    private userService;
    private readonly userRepository;
    private jwtService;
    private logger;
    constructor(userService: UserService, userRepository: UserRepository, jwtService: JwtService, logger: Logger);
    signup(createUserDto: CreateUserDto): Promise<{
        access_token: string;
    }>;
}
