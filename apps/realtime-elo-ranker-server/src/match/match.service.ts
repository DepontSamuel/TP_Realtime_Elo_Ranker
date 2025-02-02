import { Injectable } from '@nestjs/common';
import { Match } from '../model/match.entity';

@Injectable()
export class MatchService {
  private matches: Match[] = [];

  async getMatches(): Promise<Match[]> {
    return this.matches;
  }

  async addMatch(match: any): Promise<Match> {
    const newMatch = new Match();
    newMatch.winner = match.winner;
    newMatch.loser = match.loser;
    this.matches.push(newMatch);
    return newMatch;
  }
}
