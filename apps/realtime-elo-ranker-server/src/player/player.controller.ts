import { Controller, Post } from '@nestjs/common';
import { Get } from '@nestjs/common';   
import { AppService, Player } from '../app.service';

import { Body } from '@nestjs/common';

@Controller('api/player')
export class PlayerController {
    constructor(private appService: AppService) {}
    
    @Get()
    getPlayers(): Player[] {
        return this.appService.getPlayers();
    }

    @Post()
    addPlayer(@Body() playerData: { id: string }) {
        return this.appService.addPlayer(playerData.id);
    }
}
