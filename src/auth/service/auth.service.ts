import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../dto/LoginDto';
import { JwtPayloadDto } from '../dto/jwt-payload.dto';
import { UsersService } from 'src/users/service/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    const payload: JwtPayloadDto = {
      email: user.email,
      id: user.id.toString(),
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60,
    };
    return this.gerarToken(payload);
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findEmail(email);
    if (user && user.password === password) {
      return user;
    }
    throw new UnauthorizedException();
  }

  async gerarToken(payload: JwtPayloadDto) {
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
