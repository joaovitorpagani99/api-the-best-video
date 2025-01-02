import { IsString, IsNumber, IsUrl } from 'class-validator';

export class CreateVideoDto {
  @IsString()
  readonly title: string;

  @IsNumber()
  readonly rating: number;

  @IsUrl()
  readonly url: string;
}
