import { Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserRights } from './entities/user.entity';
import { UserRepository } from './user.repository';
export declare class UserService {
    private readonly userRepository;
    private readonly logger;
    constructor(userRepository: UserRepository, logger: Logger);
    create(createUserDto: CreateUserDto): Promise<{
        username: string;
        password: string;
        email: string;
        userRole: UserRights;
    } & User>;
    findAll(): Promise<User[]>;
    findOneById(id: string): Promise<User | null>;
    findOneByEmail(email: string): Promise<User | null>;
    findOneByUserName(username: string): Promise<User | null>;
    update(id: string, attrs: Partial<User>): Promise<User>;
    remove(id: string): Promise<string>;
    permanentDelete(id: string): Promise<User>;
}
