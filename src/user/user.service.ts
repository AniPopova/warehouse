import { Injectable, NotFoundException, Logger, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserRights } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';


@Injectable()
export class UserService {
  findOne(name: string) {
    throw new Error('Method not implemented.');
  }
  constructor(@InjectRepository(User) 
  private readonly userRepository: UserRepository, 
  private readonly logger: Logger) { }

  async createUser(createUserDto: CreateUserDto){
    const { name, password, email, userRole } = createUserDto;
    const chosenRole = userRole !== undefined ? userRole : UserRights.VIEWER;

    const newUser = await this.userRepository.save({
      name,
      password,
      email,
      userRole: chosenRole,
    });

    return newUser;
  }


  findAll() {
    return this.userRepository.find();
  }

  async findOneById(id: string) {
    try {
      return await this.userRepository.findOneBy({id});
    } catch (error) {
      if (error.name === 'EntityNotFound') {
        throw new NotFoundException(`User with id ${id} not found`);
      }
      else if(error.name === 'UnauthorizedException'){
        throw new UnauthorizedException('Do do not have rights to execute this action!')
      }
      this.logger.error('Error during search user', error);
      throw error; 
    }
  }

  async update(id: string, attrs: Partial<User>) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with id: ${id} not found!`);
    }
    Object.assign(user, attrs);
    await this.userRepository.save(user);
    return user;
  }

  async remove(id: string) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(`User with id: ${id} not found!`);
    }
    user.deletedAt = new Date();
    await this.userRepository.save(user);
    return `User with id: ${id} removed successfully.`
  }


  async findOneBy(email: string): Promise<User> {
    try {
      return await this.userRepository.findOneBy({ email });
    } catch (error) {
      this.logger.error('Error during searching user', error);
      throw error; 
    }
  }
}
