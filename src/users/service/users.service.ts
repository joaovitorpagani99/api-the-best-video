import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UsersRepository } from '../repository/users.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(dto: CreateUserDto): Promise<User> {
    const user = plainToInstance(User, dto);
    try {
      const newUser = await this.usersRepository.createUser(user);
      if (!newUser) {
        throw new BadRequestException('User not created');
      }
      return newUser;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async findEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findAll(): Promise<User[]> {
    const users: User[] = await this.usersRepository.findAllUsers();
    if (!users) {
      throw new NotFoundException('Users not found');
    }
    return users;
  }
}
