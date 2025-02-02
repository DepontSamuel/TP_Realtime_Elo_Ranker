import { Match } from '../model/match.entity';
export declare class MatchService {
    private matches;
    getMatches(): Promise<Match[]>;
    addMatch(match: any): Promise<Match>;
}
