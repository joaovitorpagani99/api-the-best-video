import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/service/users.service';
import { JwtPayloadDto } from '../dto/jwt-payload.dto';
import { LoginDto } from '../dto/LoginDto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload: JwtPayloadDto = {
      email: user.email,
      id: user.id.toString(),
      iat: Math.floor(Date.now() / 1000),
    };
    return this.gerarToken(payload);
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findEmail(email);
    if (user && user.password === password) {
      return user;
    }
    return null;
  }

  gerarToken(payload: JwtPayloadDto) {
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
