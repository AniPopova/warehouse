import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserRights } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';


@Injectable()
export class UserService {
  constructor(@InjectRepository(User) 
  private readonly userRepository: UserRepository, 
  private readonly logger: Logger) { }

  async create(createUserDto: CreateUserDto){
    const { username, password, email, userRole } = createUserDto;
    const chosenRole = userRole !== undefined ? userRole : UserRights.VIEWER;

    const newUser = await this.userRepository.save({
      username,
      password,
      email,
      userRole: chosenRole,
    });

    return newUser;
  }


  async findAll() {
    const users =  this.userRepository.find();
    if ((await users).length === 0) {
      throw new NotFoundException('DB is empty!');
    }
    return users;
  }

  async findOneById(id: string): Promise<User | null> {
    try {
      const user = await this.userRepository.findOneBy({ id });

      if (!user) {
        throw new NotFoundException(`User not found`);
      }
      return user;
    } catch (error) {
      this.logger.error('Error during search user', error);
    }
  }

  async findOneByEmail(email: string): Promise<User | null> {
    try {
      const user = await this.userRepository.findOneBy({ email });
      if (!user) {
        throw new NotFoundException(`User not found`);
      }
      return user;
    } catch (error) {
      this.logger.error('Error during search user', error);
    }
  }

  async findOneByUserName(username: string): Promise<User | null> {
    try {
      const user = await this.userRepository.findOneBy({ username });
      if (!user) {
        throw new NotFoundException(`User not found`);
      }
      return user;
    } catch (error) {
      this.logger.error('Error during search user', error);
    }
  }

  async update(id: string, attrs: Partial<User>) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User not found!`);
    }
    Object.assign(user, attrs);
    await this.userRepository.save(user);
    return user;
  }

  async remove(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User not found!`);
    }
    user.deletedAt = new Date();
    await this.userRepository.save(user);
    return `User removed successfully.`
  }

  async permanentDelete(id: string) {
    try {
      const user = await this.userRepository.findOneBy({ id });
      if (!user) {
        throw new NotFoundException(`User not found.`);
      }
      return await this.userRepository.remove(user);
    } catch (error) {
      this.logger.error('Error during permanent delete.', error);
    }
  }
}
