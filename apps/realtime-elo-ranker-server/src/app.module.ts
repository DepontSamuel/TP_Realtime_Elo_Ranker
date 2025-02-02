import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayerController } from './player/player.controller';
import { MatchController } from './match/match.controller';
import { playerService } from './player/player.service';
import { MatchService } from './match/match.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { RankingController } from './ranking/ranking.controller';

@Module({
  imports: [EventEmitterModule.forRoot()],
  controllers: [AppController, PlayerController, MatchController, RankingController],
  providers: [AppService, playerService, MatchService],
})
export class AppModule {}
