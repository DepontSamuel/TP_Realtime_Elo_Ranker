import { Injectable, NotFoundException } from '@nestjs/common';


export interface Player {
  id: string;
  rank: number;
}

@Injectable()
export class AppService {
  private players: Player[] = [];

  getHello(): string {
    return 'Hello World!';
  }

  addPlayer(id: string): void {
    let player: Player = {
      id,
      rank: 0,
    };
    this.players.push(player);
  }

  getPlayers(): Player[] {
    return this.players;
  }

  getPlayer(id: string): Player {
    const player = this.players.find(player => player.id === id);
    if (!player) {
      throw new NotFoundException(`Player with id ${id} not found`);
    }
    return player;
  }

  
}
