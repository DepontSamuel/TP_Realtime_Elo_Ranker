import { playerService } from '../player/player.service';
export declare class RankingController {
    private readonly playerService;
    constructor(playerService: playerService);
    getRanking(): Promise<import("../model/player.entity").Player[]>;
}
