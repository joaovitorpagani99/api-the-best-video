import { Module } from '@nestjs/common';
import { VoteService } from './service/vote.service';
import { VoteController } from './controller/vote.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vote } from './entities/vote.entity';
import { VoteRepository } from './repository/vote.repository';
import { VideoModule } from 'src/video/video.module';

@Module({
  imports: [TypeOrmModule.forFeature([Vote]), VideoModule],
  controllers: [VoteController],
  providers: [VoteService, VoteRepository],
})
export class VoteModule {}
