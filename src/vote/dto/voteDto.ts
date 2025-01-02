import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class VoteDto {
  @ApiProperty()
  @IsNumber()
  videoId: number;

  @ApiProperty()
  @IsNumber()
  vote: number;
}
