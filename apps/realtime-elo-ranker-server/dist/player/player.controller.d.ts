import { playerService } from './player.service';
export declare class PlayerController {
    private playerService;
    constructor(playerService: playerService);
    getPlayers(): Promise<import("../model/player.entity").Player[]>;
    addPlayer(id: string): Promise<import("../model/player.entity").Player> | {
        code: number;
        message: string;
    };
}
