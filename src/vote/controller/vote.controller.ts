import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { VoteService } from '../service/vote.service';
import { ResponseStatus } from 'src/utils/response.enum';

@Controller('vote')
export class VoteController {
  constructor(private readonly voteService: VoteService) {}

  @Post()
  public async registerVote(
    @Res() response: Response,
    @Body() voteDto: { videoId: number; vote: number },
  ) {
    await this.voteService.registerVote(voteDto.videoId, voteDto.vote);
    return response.status(HttpStatus.CREATED).json({
      type: ResponseStatus.SUCCESS,
      message: 'Vote registered successfully',
    });
  }
}
