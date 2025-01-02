import { Module } from '@nestjs/common';
import { VideoService } from './service/video.service';
import { VideoController } from './controller/video.controller';
import { VideoRepository } from './repository/video-repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Video } from './entities/video.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Video])],
  controllers: [VideoController],
  providers: [VideoService, VideoRepository],
  exports: [VideoService],
})
export class VideoModule {}
