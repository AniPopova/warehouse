import { Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
export declare class UserService {
    private readonly userRepository;
    private readonly logger;
    findOne(name: string): void;
    constructor(userRepository: Repository<User>, logger: Logger);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findOneById(id: string): Promise<User>;
    update(id: string, attrs: Partial<User>): Promise<User>;
    remove(id: string): Promise<string>;
    findOneBy(email: string): Promise<User | null>;
}
