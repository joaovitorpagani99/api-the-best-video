import { ApiProperty } from '@nestjs/swagger';
import { Video } from 'src/video/entities/video.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Vote {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'The unique identifier of the vote' })
  id: number;

  @ManyToOne(() => Video, (video) => video.votes)
  @ApiProperty({
    type: () => Video,
    description: 'The video associated with the vote',
  })
  video: Video;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty({
    example: '2023-10-01T00:00:00Z',
    description: 'The timestamp when the vote was created',
  })
  created_at: Date;
}
