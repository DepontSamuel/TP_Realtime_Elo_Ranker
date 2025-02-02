import { Player } from '../model/player.entity';
export declare class playerService {
    private players;
    getPlayers(): Promise<Player[]>;
    addPlayer(id: string): Promise<Player>;
    getPlayer(id: string): Promise<Player>;
    updatePlayer(player: Player): Promise<void>;
}
