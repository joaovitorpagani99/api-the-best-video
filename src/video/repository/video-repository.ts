import { Repository } from 'typeorm';
import { Video } from '../entities/video.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class VideoRepository {
  constructor(
    @InjectRepository(Video)
    private repository: Repository<Video>,
  ) {}

  public async saveVideo(video: Video): Promise<Video> {
    return await this.repository.save(video);
  }

  public async findVideo(id: number): Promise<Video> {
    return await this.repository.findOne({ where: { id } });
  }

  public async getRankedVideos(): Promise<Video[]> {
    return await this.repository.find({ order: { rating: 'DESC' } });
  }

  public async updateVideo(video: Video): Promise<Video> {
    const updatedVideo = await this.repository.update(video.id, video);
    if (!updatedVideo.affected) {
      return null;
    }
    return this.findVideo(video.id);
  }

  public async getTwoVideosForVoting(): Promise<Video[]> {
    return await this.repository
      .createQueryBuilder('video')
      .orderBy('RANDOM()')
      .limit(2)
      .getMany();
  }
}
