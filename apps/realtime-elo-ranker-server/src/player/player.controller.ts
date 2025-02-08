import { Controller, Post } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { PlayerService } from './player.service';
import { AppService } from '../app.service';
import { Body } from '@nestjs/common';
import { get } from 'http';

@Controller('api/player')
export class PlayerController {
  constructor(
    private playerService: PlayerService,
    private AppService: AppService,
  ) {}

  @Get()
  getPlayers() {
    return this.playerService.getPlayers();
  }

  @Post()
  addPlayer(@Body('id') id: string) {
    if (!id) {
      return {
        ok: false,
        code: 400,
        message: 'Il manque un id',
      };
    }

    this.playerService.getPlayer(id).then((player) => {
      if (player) {
        return {
          ok: false,
          code: 400,
          message: 'Le joueur existe déjà',
        };
      } else {
        this.playerService.addPlayer(id);
        this.AppService.notifyObservers({ id: id, rank: 1000 });
        return {
          ok: true,
          code: 200,
          message: 'Joueur ajouté',
        };
      }
    });
  }
}
