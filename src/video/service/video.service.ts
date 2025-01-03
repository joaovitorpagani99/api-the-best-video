import { Injectable } from '@nestjs/common';
import { VideoRepository } from '../repository/video-repository';
import { CreateVideoDto } from '../dto/create-video.dto';
import { Video } from '../entities/video.entity';
import { plainToClass } from 'class-transformer';

@Injectable()
export class VideoService {
  constructor(private readonly videoRepository: VideoRepository) {}

  public async createVideo(createVideoDto: CreateVideoDto): Promise<Video> {
    const video: Video = plainToClass(Video, createVideoDto);
    return this.videoRepository.saveVideo(video);
  }

  public async findById(id: number): Promise<Video> {
    return this.videoRepository.findVideo(id);
  }

  public async getRankedVideos(): Promise<Video[]> {
    return this.videoRepository.getRankedVideos();
  }

  public async getTwoVideosForVoting(): Promise<Video[]> {
    return this.videoRepository.getTwoVideosForVoting();
  }

  public async updateVideo(video: Video): Promise<Video> {
    return this.videoRepository.updateVideo(video);
  }

  public async deleteVideo(id: number) {
    return this.videoRepository.deleteVideo(id);
  }
}
