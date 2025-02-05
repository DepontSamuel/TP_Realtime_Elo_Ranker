import { Injectable } from '@nestjs/common';
import { Match } from '../model/match.entity';

@Injectable()
export class MatchService {
  async getMatches(): Promise<string> {
    const matches = await Match.find();
    return JSON.stringify(matches);
  }

  async addMatch(match: any): Promise<void> {
    const newMatch = new Match();
    newMatch.winner = match.winner;
    newMatch.loser = match.loser;
    await newMatch.save();
  }
}
