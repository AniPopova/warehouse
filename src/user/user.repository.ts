import { DeepPartial, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { AuthCredentialsDto } from 'src/auth/dto/auth-credentials.dto';
import { CustomRepository } from 'db/typeorm-ex.decorator';

@CustomRepository(User)
export class UserRepository extends Repository<User> {

    async createUser(authCredentialsDto: AuthCredentialsDto) {
      const { username, password, email, userRole } = authCredentialsDto;
  
      const user = this.create({ username, password, email, userRole });
      await this.save(user);
    }
  }
