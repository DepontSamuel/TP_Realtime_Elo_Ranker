"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const player_controller_1 = require("./player/player.controller");
const match_controller_1 = require("./match/match.controller");
const player_service_1 = require("./player/player.service");
const match_service_1 = require("./match/match.service");
const event_emitter_1 = require("@nestjs/event-emitter");
const ranking_controller_1 = require("./ranking/ranking.controller");
const ranking_events_controller_1 = require("./ranking/events/ranking.events.controller");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [event_emitter_1.EventEmitterModule.forRoot()],
        controllers: [
            app_controller_1.AppController,
            player_controller_1.PlayerController,
            match_controller_1.MatchController,
            ranking_controller_1.RankingController,
            ranking_events_controller_1.RankingEventsController,
        ],
        providers: [app_service_1.AppService, player_service_1.playerService, match_service_1.MatchService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map