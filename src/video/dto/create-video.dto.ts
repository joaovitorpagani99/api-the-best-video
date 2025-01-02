import { IsString, IsNumber, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateVideoDto {
  @ApiProperty({
    example: 'My Video Title',
    description: 'The title of the video',
  })
  @IsString()
  readonly title: string;

  @ApiProperty({ example: 5, description: 'The rating of the video' })
  @IsNumber()
  readonly rating: number;

  @ApiProperty({
    example: 'https://www.youtube.com/watch?v=123',
    description: 'The URL of the video',
  })
  @IsUrl()
  readonly url: string;
}
