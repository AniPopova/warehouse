import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { AuthCredentialsDto } from 'src/auth/dto/auth-credentials.dto';
export declare class UserRepository extends Repository<User> {
    createUser(authCredentialsDto: AuthCredentialsDto): Promise<void>;
}
