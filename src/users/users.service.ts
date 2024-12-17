import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto) {
    // Use createUserDto conforme necessário
    return `This action adds a new user with email ${createUserDto.email}`;
  }

  findAll() {
    return `This action returns all users`;
  }

  async findEmail(email: string): Promise<User> {
    // Use email conforme necessário
    return null;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    // Use updateUserDto conforme necessário
    return `This action updates a #${id} user with email ${updateUserDto.email}`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
