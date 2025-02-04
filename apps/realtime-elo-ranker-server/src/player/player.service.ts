import { Injectable, NotFoundException } from '@nestjs/common';
import { Player } from '../model/player.entity';
import { AppService } from 'src/app.service';

@Injectable()
export class playerService {
  constructor(private appService: AppService) {}
  private players: Player[] = [];

  async getPlayers(): Promise<Player[]> {
    return this.players;
  }

  async addPlayer(id: string): Promise<Player> {
    const player = new Player();
    player.id = id;
    player.rank = 1000;
    this.players.push(player);
    this.appService.notifyObservers(player);
    return player;
  }

  async getPlayer(id: string): Promise<Player> {
    const player = this.players.find((player) => player.id === id);
    if (!player) {
      throw new NotFoundException('Player not found');
    }
    return player;
  }

  async updatePlayer(player: Player): Promise<void> {
    await this.getPlayer(player.id);
    this.players = this.players.map((p) => (p.id === player.id ? player : p));
  }
}
