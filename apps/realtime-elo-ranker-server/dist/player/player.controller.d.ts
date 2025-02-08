import { PlayerService } from './player.service';
import { AppService } from '../app.service';
export declare class PlayerController {
    private playerService;
    private AppService;
    constructor(playerService: PlayerService, AppService: AppService);
    getPlayers(): Promise<string>;
    addPlayer(id: string): {
        ok: boolean;
        code: number;
        message: string;
    } | undefined;
}
