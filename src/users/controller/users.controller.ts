import {
  Controller,
  Post,
  Res,
  Body,
  HttpStatus,
  Get,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { CreateUserDto } from '../dto/create-user.dto';
import { ResponseStatus } from 'src/utils/response.enum';
import { UsersService } from '../service/users.service';
import { Public } from 'src/auth/decorators/public.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';

@ApiTags('users')
@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiBody({ type: CreateUserDto })
  public async create(@Res() response, @Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return response.status(HttpStatus.CREATED).json({
      type: ResponseStatus.SUCCESS,
      message: 'User has been created successfully',
      data: user,
    });
  }

  @Roles(Role.Admin)
  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Users retrieved successfully' })
  public async findAll(@Res() response) {
    const users = await this.usersService.findAll();
    return response.status(HttpStatus.OK).json({
      type: ResponseStatus.SUCCESS,
      message: 'Users has been found successfully',
      data: users,
    });
  }

  @Roles(Role.Admin)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({ status: 204, description: 'User deleted successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiParam({ name: 'id', description: 'The ID of the user to delete' })
  async deleteUser(@Param('id') id: number, @Res() response) {
    await this.usersService.deleteUser(+id);
    return response.status(HttpStatus.NO_CONTENT).json({
      type: ResponseStatus.SUCCESS,
      message: 'User has been deleted successfully',
    });
  }
}
