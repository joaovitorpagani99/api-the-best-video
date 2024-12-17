import { Module } from '@nestjs/common';
import { VoteService } from './service/vote.service';
import { VoteController } from './controller/vote.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vote } from './entities/vote.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vote])],
  controllers: [VoteController],
  providers: [VoteService],
})
export class VoteModule {}
