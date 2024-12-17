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

  async create(dto: CreateUserDto) {
    const user: User = plainToInstance(User, dto);

    const newUser: User = await this.usersRepository.createUser(user);
    if (!newUser) {
      throw new BadRequestException('User not created');
    }
    return user;
  }

  async findById(id: number): Promise<User> {
    const user: User = await this.usersRepository.findOneUser(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async findEmail(email: string): Promise<User> {
    const user: User = await this.usersRepository.findEmail(email);
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

  async findAll(): Promise<User[]> {
    const users: User[] = await this.usersRepository.findAllUsers();
    if (!users || users.length === 0) {
      throw new NotFoundException('Users not found');
    }
    return users;
  }

  async deleteUser(id: number): Promise<void> {
    await this.findById(id);
    const result = await this.usersRepository.deleteUser(id);
    if (!result.affected) {
      throw new BadRequestException('User not deleted');
    }
  }
}
