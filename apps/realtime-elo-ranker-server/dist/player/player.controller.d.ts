import { AppService, Player } from '../app.service';
export declare class PlayerController {
    private appService;
    constructor(appService: AppService);
    getPlayers(): Player[];
    addPlayer(playerData: {
        id: string;
    }): void;
}
