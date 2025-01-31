export interface Player {
    id: string;
    rank: number;
}
export declare class AppService {
    private players;
    getHello(): string;
    addPlayer(id: string): void;
    getPlayers(): Player[];
    getPlayer(id: string): Player;
}
