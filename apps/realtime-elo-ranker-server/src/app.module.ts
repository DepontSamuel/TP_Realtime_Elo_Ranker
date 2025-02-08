import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayerController } from './player/player.controller';
import { MatchController } from './match/match.controller';
import { PlayerService } from './player/player.service';
import { MatchService } from './match/match.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { RankingController } from './ranking/ranking.controller';
import { RankingEventsController } from './ranking/events/ranking.events.controller';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  ],
  controllers: [
    AppController,
    PlayerController,
    MatchController,
    RankingController,
    RankingEventsController,
  ],
  providers: [AppService, PlayerService, MatchService],
})
export class AppModule {}
