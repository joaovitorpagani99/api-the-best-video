import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vote } from '../entities/vote.entity';

@Injectable()
export class VoteRepository {
  constructor(
    @InjectRepository(Vote)
    private repository: Repository<Vote>,
  ) {}
  public async saveVote(vote: Vote): Promise<Vote> {
    return await this.repository.save(vote);
  }
}
