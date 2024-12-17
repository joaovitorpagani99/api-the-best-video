import { Logger, Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
const logger = new Logger('AuthModule');

if (!process.env.secret_key) {
  logger.error('JWT secret key is not defined');
  throw new Error('JWT secret key is not defined');
}

if (!process.env.JWT_EXPIRE) {
  logger.error('JWT expiration time is not defined');
  throw new Error('JWT expiration time is not defined');
}
@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: process.env.secret_key,
      signOptions: { expiresIn: process.env.JWT_EXPIRE },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
