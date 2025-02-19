import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { LoginDto } from '../dto/LoginDto';
import { Public } from '../decorators/public.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { Response } from 'express';
import { UsersService } from 'src/users/service/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Role } from 'src/common/enums/role.enum';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('/login')
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: 200, description: 'Login successful' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  @ApiBody({ type: LoginDto })
  async login(@Body() loginDto: LoginDto, @Res() response: Response) {
    const loginResponse = await this.authService.login(loginDto);
    return response.status(HttpStatus.OK).json({
      access_token: loginResponse.access_token,
      isAdmin: loginResponse.isAdmin,
    });
  }

  @Post('admin')
  @ApiOperation({ summary: 'Create a new admin' })
  @ApiResponse({ status: 201, description: 'Admin created successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiBody({ type: CreateUserDto })
  async createAdmin(
    @Body() createUserDto: CreateUserDto,
    @Res() response: Response,
  ) {
    createUserDto.role = Role.Admin;
    const admin = await this.usersService.create(createUserDto);
    return response.status(HttpStatus.CREATED).json({
      type: 'success',
      message: 'Admin has been created successfully',
      data: admin,
    });
  }
}
