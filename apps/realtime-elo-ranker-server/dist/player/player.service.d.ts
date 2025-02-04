import { Player } from '../model/player.entity';
import { AppService } from 'src/app.service';
export declare class playerService {
    private appService;
    constructor(appService: AppService);
    private players;
    getPlayers(): Promise<Player[]>;
    addPlayer(id: string): Promise<Player>;
    getPlayer(id: string): Promise<Player>;
    updatePlayer(player: Player): Promise<void>;
}
