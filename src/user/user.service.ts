import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

  async create(createUserDto: CreateUserDto) {
    try {
      const { username, password, email, userRole } = createUserDto;
      const newUser = await this.userRepository.save({
        username,
        password,
        email,
        userRole,
      });

      return newUser;
    } catch (error) {
      throw new BadRequestException('Impossible create', error);
    }
  }


  async findAll() {
    const users = await this.userRepository.find();
    if (!users || users.length === 0) {
      throw new NotFoundException('DB is empty!');
    }
    return users;
  }


  async findOneById(id: string): Promise<User> {
    try {
      const user = await this.userRepository.findOneBy({ id });
      if (!user) {
        throw new NotFoundException(`User not found`);
      }
      return user;
    } catch (error) {
      throw new BadRequestException('Error during search user', error);
    }
  }


  async findOneByEmail(email: string): Promise<User> {
      const user = await this.userRepository.findOneBy({ email });
      if (!user) {
        throw new NotFoundException(`User not found`);
      }
      return user;
  }


  async findOneByUserName(username: string): Promise<User> {
      const user = await this.userRepository.findOneBy({ username });
      if (!user) {
        throw new NotFoundException(`User not found`);
      }
      return user;
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
    return await this.userRepository.save(user);
  }

  
  async permanentDelete(id: string) {
    try {
      const user = await this.userRepository.findOneBy({ id });
      if (!user) {
        throw new NotFoundException(`User not found.`);
      }
      return await this.userRepository.remove(user);
    } catch (error) {
      throw new BadRequestException('Error during permanent delete.', error);
    }
  }
}
