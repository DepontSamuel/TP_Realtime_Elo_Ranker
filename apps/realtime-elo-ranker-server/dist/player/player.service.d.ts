import { Player } from '../model/player.entity';
export declare class PlayerService {
    getPlayers(): Promise<string>;
    getPlayer(id: string): Promise<Player | undefined>;
    addPlayer(id: string): Promise<any>;
    updatePlayer(player: Player): Promise<void>;
}
