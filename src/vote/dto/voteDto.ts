import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class VoteDto {
  @ApiProperty({ example: 1, description: 'The ID of the video' })
  @IsNumber()
  videoId: number;

  @ApiProperty({ example: 1, description: 'The vote value' })
  @IsNumber()
  vote: number;
}
