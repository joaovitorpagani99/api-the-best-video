import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsEnum } from 'class-validator';
import { Role } from 'src/common/enums/role.enum';

export class CreateUserDto {
  @ApiProperty({ example: 'João', description: 'The name of the user' })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'joao@example.com',
    description: 'The email of the user',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'The password of the user',
  })
  @IsString()
  password: string;

  @ApiProperty({
    example: Role.User,
    description: 'The role of the user',
    enum: Role,
  })
  @IsEnum(Role)
  role: Role;
}
