import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AppService } from '../app.service';

@Controller('api/match')
export class MatchController {
    constructor(private appService: AppService) {}
    @Post('publish')
    async publishMatchResults(@Body() body: { winner: string; loser: string; draw: boolean }) {
        const { winner, loser, draw } = body;

        if (!winner || !loser) {
            throw new HttpException({
                code: 422,
                message: 'Either the winner or the loser specified does not exist',
            }, HttpStatus.UNPROCESSABLE_ENTITY);
        }

        const winnerPlayer = this.appService.getPlayer(winner); 
        const loserPlayer = this.appService.getPlayer(loser);
        console.log(winnerPlayer, loserPlayer); 

        if (draw) {
            return {
                winner: winnerPlayer,
                loser: loserPlayer,
            };
        } else {
            winnerPlayer.rank += 10; 
            loserPlayer.rank -= 10;

            return {
                winner: winnerPlayer,
                loser: loserPlayer,
            };
        }
    }
}
