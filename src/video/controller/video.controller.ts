import { Controller, Post, Res, Body, HttpStatus, Get } from '@nestjs/common';
import { Response } from 'express';
import { VideoService } from '../service/video.service';
import { CreateVideoDto } from '../dto/create-video.dto';
import { ResponseStatus } from 'src/utils/response.enum';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post()
  public async createVideo(
    @Res() response: Response,
    @Body() createVideoDto: CreateVideoDto,
  ) {
    const video = await this.videoService.createVideo(createVideoDto);
    return response.status(HttpStatus.CREATED).json({
      type: ResponseStatus.SUCCESS,
      message: 'Video has been created successfully',
      data: video,
    });
  }

  @Get()
  public async getRankedVideos(@Res() response: Response) {
    const videos = await this.videoService.getRankedVideos();
    return response.status(HttpStatus.OK).json({
      type: ResponseStatus.SUCCESS,
      message: 'Ranked videos retrieved successfully',
      data: videos,
    });
  }

  @Get('vote')
  public async getTwoVideosForVoting(@Res() response: Response) {
    const videos = await this.videoService.getTwoVideosForVoting();
    return response.status(HttpStatus.OK).json({
      type: ResponseStatus.SUCCESS,
      message: 'Two videos for voting retrieved successfully',
      data: videos,
    });
  }
}
