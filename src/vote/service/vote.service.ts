import { Injectable } from '@nestjs/common';
import { Vote } from '../entities/vote.entity';
import { VoteRepository } from '../repository/vote.repository';
import { VideoService } from 'src/video/service/video.service';

@Injectable()
export class VoteService {
  constructor(
    private readonly videoService: VideoService,
    private readonly voteRepository: VoteRepository,
  ) {}

  public async registerVote(videoId: number, vote: number): Promise<void> {
    const video = await this.videoService.findById(videoId);
    if (!video) {
      throw new Error('Video not found');
    }

    video.rating += vote;
    await this.videoService.updateVideo(video);

    const newVote = new Vote();
    newVote.video = video;
    await this.voteRepository.saveVote(newVote);
  }
}
