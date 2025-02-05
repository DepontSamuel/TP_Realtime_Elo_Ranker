import { Controller, Post } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { playerService } from './player.service';
import { AppService } from '../app.service';
import { Body } from '@nestjs/common';

@Controller('api/player')
export class PlayerController {
  constructor(
    private playerService: playerService,
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
        code: 422,
        message: 'No ID specified',
      };
    }
    this.playerService.addPlayer(id);
    this.AppService.notifyObservers({ id: id, rank: 1000 });
    return;
  }
}
