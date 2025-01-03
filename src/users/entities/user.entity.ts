import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/common/enums/role.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'The unique identifier of the user' })
  id: number;

  @Column()
  @ApiProperty({ example: 'João', description: 'The name of the user' })
  name: string;

  @Column()
  @ApiProperty({
    example: 'joao@example.com',
    description: 'The email of the user',
  })
  email: string;

  @Column()
  @ApiProperty({
    example: 'password123',
    description: 'The password of the user',
  })
  password: string;

  @ApiProperty({
    example: Role.User,
    description: 'The role of the user',
    enum: Role,
  })
  @Column({ default: Role.User })
  role: Role;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
