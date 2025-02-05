import { playerService } from './player.service';
import { AppService } from '../app.service';
export declare class PlayerController {
    private playerService;
    private AppService;
    constructor(playerService: playerService, AppService: AppService);
    getPlayers(): Promise<string>;
    addPlayer(id: string): {
        code: number;
        message: string;
    } | undefined;
}
