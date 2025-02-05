import { Injectable, NotFoundException } from '@nestjs/common';
import { Player } from '../model/player.entity';
import { AppService } from 'src/app.service';

@Injectable()
export class playerService {
  async getPlayers(): Promise<string> {
    const players = await Player.find({ order: { rank: 'DESC' } });
    return JSON.stringify(players);
  }

  async addPlayer(id: string): Promise<any> {
    await Player.insert({ id: id, rank: 1000 });
  }

  async getPlayer(id: string): Promise<Player> {
    const player = await Player.findOne({ where: { id: id } });
    if (!player) {
      throw new NotFoundException(`Player with id ${id} not found`);
    }
    return player;
  }

  async updatePlayer(player: Player): Promise<void> {
    await Player.update({ id: player.id }, player);
  }
}
