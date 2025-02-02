import { playerService } from 'src/player/player.service';
import { MatchService } from './match.service';
import { AppService } from 'src/app.service';
export declare class MatchController {
    private playerService;
    private matchService;
    private appService;
    constructor(playerService: playerService, matchService: MatchService, appService: AppService);
    getAllMatches(): Promise<any>;
    publishMatchResult(matchResult: {
        winner: string;
        loser: string;
        draw: boolean;
    }): Promise<{
        ok: boolean;
        code: number;
        message: string;
        winner?: undefined;
        loser?: undefined;
    } | {
        ok: boolean;
        code: number;
        winner: {
            id: string;
            rank: number;
        };
        loser: {
            id: string;
            rank: number;
        };
        message?: undefined;
    }>;
}
