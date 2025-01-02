import {
  Controller,
  Post,
  Res,
  Body,
  HttpStatus,
  Get,
  Delete,
  Param,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { ResponseStatus } from 'src/utils/response.enum';
import { UsersService } from '../service/users.service';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()
  public async create(@Res() response, @Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return response.status(HttpStatus.CREATED).json({
      type: ResponseStatus.SUCCESS,
      message: 'User has been created successfully',
      data: user,
    });
  }

  @Get()
  public async findAll(@Res() response) {
    const users = await this.usersService.findAll();
    return response.status(HttpStatus.OK).json({
      type: ResponseStatus.SUCCESS,
      message: 'Users has been found successfully',
      data: users,
    });
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number, @Res() response) {
    await this.usersService.deleteUser(+id);
    return response.status(HttpStatus.NO_CONTENT).json({
      type: ResponseStatus.SUCCESS,
      message: 'User has been deleted successfully',
    });
  }
}
