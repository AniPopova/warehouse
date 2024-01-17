import { Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserRights } from './entities/user.entity';
import { UserRepository } from './user.repository';
export declare class UserService {
    private readonly userRepository;
    private readonly logger;
    findOne(name: string): void;
    constructor(userRepository: UserRepository, logger: Logger);
    createUser(createUserDto: CreateUserDto): Promise<{
        name: string;
        password: string;
        email: string;
        userRole: UserRights;
    } & User>;
    findAll(): Promise<User[]>;
    findOneById(id: string): Promise<User>;
    update(id: string, attrs: Partial<User>): Promise<User>;
    remove(id: string): Promise<string>;
    findOneBy(email: string): Promise<User>;
}
