import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/LoginDto';
import { UsersService } from '../users/users.service'; // Caminho relativo ajustado
import { JwtService } from '@nestjs/jwt';
import { JwtPayloadDto } from './dto/jwt-payload.dto';

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
