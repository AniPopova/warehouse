import { UserRights } from './entities/user.entity';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(): Promise<import("./entities/user.entity").User[]>;
    getUser(id: string): Promise<import("./entities/user.entity").User>;
    create(body: CreateUserDto): Promise<{
        username: string;
        password: string;
        email: string;
        userRole: UserRights;
    } & import("./entities/user.entity").User>;
    update(id: string, body: UpdateUserDto): Promise<import("./entities/user.entity").User>;
    remove(id: string): Promise<string>;
    permRemove(id: string): Promise<import("./entities/user.entity").User>;
}
