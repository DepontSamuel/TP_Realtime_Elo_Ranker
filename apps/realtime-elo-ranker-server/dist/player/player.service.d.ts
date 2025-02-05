import { Player } from '../model/player.entity';
export declare class playerService {
    getPlayers(): Promise<string>;
    addPlayer(id: string): Promise<any>;
    getPlayer(id: string): Promise<Player>;
    updatePlayer(player: Player): Promise<void>;
}
