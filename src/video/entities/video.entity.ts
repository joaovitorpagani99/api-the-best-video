import { ApiProperty } from '@nestjs/swagger';
import { Vote } from 'src/vote/entities/vote.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Video {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the video',
  })
  id: number;

  @Column({ type: 'text' })
  @ApiProperty({
    example: 'My Video Title',
    description: 'The title of the video',
  })
  title: string;

  @Column({ type: 'integer' })
  @ApiProperty({ example: 5, description: 'The rating of the video' })
  rating: number;

  @Column({ type: 'text' })
  @ApiProperty({
    example: 'https://www.youtube.com/watch?v=123',
    description: 'The URL of the video',
  })
  url: string;

  @OneToMany(() => Vote, (vote) => vote.video)
  @ApiProperty({ type: () => [Vote], description: 'The votes for the video' })
  votes: Vote[];
}
