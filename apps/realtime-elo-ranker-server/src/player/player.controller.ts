import { Controller, Post } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { playerService } from './player.service';

import { Body } from '@nestjs/common';

@Controller('api/player')
export class PlayerController {
  constructor(private playerService: playerService) {}

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
    return this.playerService.addPlayer(id);
  }
}
