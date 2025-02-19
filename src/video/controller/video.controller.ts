import {
  Controller,
  Post,
  Res,
  Body,
  HttpStatus,
  Get,
  Delete,
  Param,
} from '@nestjs/common';
import { Response } from 'express';
import { VideoService } from '../service/video.service';
import { CreateVideoDto } from '../dto/create-video.dto';
import { ResponseStatus } from 'src/utils/response.enum';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('video')
@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new video' })
  @ApiResponse({ status: 201, description: 'Video created successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiBody({ type: CreateVideoDto })
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
  @ApiOperation({ summary: 'Get ranked videos' })
  @ApiResponse({
    status: 200,
    description: 'Ranked videos retrieved successfully',
  })
  public async getRankedVideos(@Res() response: Response) {
    const videos = await this.videoService.getRankedVideos();
    return response.status(HttpStatus.OK).json({
      type: ResponseStatus.SUCCESS,
      message: 'Ranked videos retrieved successfully',
      data: videos,
    });
  }

  @Get('vote')
  @ApiOperation({ summary: 'Get two videos for voting' })
  @ApiResponse({
    status: 200,
    description: 'Two videos for voting retrieved successfully',
  })
  public async getTwoVideosForVoting(@Res() response: Response) {
    const videos = await this.videoService.getTwoVideosForVoting();
    return response.status(HttpStatus.OK).json({
      type: ResponseStatus.SUCCESS,
      message: 'Two videos for voting retrieved successfully',
      data: videos,
    });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a video' })
  @ApiResponse({ status: 204, description: 'Video deleted successfully' })
  @ApiResponse({ status: 404, description: 'Video not found' })
  @ApiParam({ name: 'id', description: 'The ID of the video to delete' })
  public async deleteVideo(@Param('id') id: number, @Res() response: Response) {
    await this.videoService.deleteVideo(+id);
    return response.status(HttpStatus.NO_CONTENT).json({
      type: ResponseStatus.SUCCESS,
      message: 'Video has been deleted successfully',
    });
  }
}
