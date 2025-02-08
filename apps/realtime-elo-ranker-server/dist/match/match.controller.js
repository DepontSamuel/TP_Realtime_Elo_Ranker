"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchController = void 0;
const common_1 = require("@nestjs/common");
const player_service_1 = require("../player/player.service");
const match_service_1 = require("./match.service");
const app_service_1 = require("../app.service");
let MatchController = class MatchController {
    constructor(playerService, matchService, appService) {
        this.playerService = playerService;
        this.matchService = matchService;
        this.appService = appService;
    }
    async getAllMatches() {
        return await this.matchService.getMatches();
    }
    async publishMatchResult(matchResult) {
        const { winner, loser, draw } = matchResult;
        if (draw) {
            return {
                ok: true,
                code: 200,
                message: 'Match nul',
            };
        }
        else if (!winner || !loser) {
            return {
                ok: false,
                code: 400,
                message: 'Il manque un joueur',
            };
        }
        const winnerPlayer = await this.playerService.getPlayer(winner);
        const loserPlayer = await this.playerService.getPlayer(loser);
        if (!winnerPlayer || !loserPlayer) {
            return {
                ok: false,
                code: 400,
                message: "Un des joueurs n'existe pas",
            };
        }
        const K = 32;
        const expectedScoreWinner = 1 / (1 + Math.pow(10, (loserPlayer.rank - winnerPlayer.rank) / 400));
        const expectedScoreLoser = 1 / (1 + Math.pow(10, (winnerPlayer.rank - loserPlayer.rank) / 400));
        winnerPlayer.rank += K * (1 - expectedScoreWinner);
        loserPlayer.rank += K * (0 - expectedScoreLoser);
        winnerPlayer.rank = Math.round(winnerPlayer.rank);
        loserPlayer.rank = Math.round(loserPlayer.rank);
        await this.playerService.updatePlayer(winnerPlayer);
        await this.playerService.updatePlayer(loserPlayer);
        this.matchService.addMatch({
            winner: winnerPlayer.id,
            loser: loserPlayer.id,
        });
        this.appService.notifyObservers(winnerPlayer);
        this.appService.notifyObservers(loserPlayer);
        return {
            ok: true,
            code: 200,
            winner: {
                id: winner,
                rank: winnerPlayer.rank,
            },
            loser: {
                id: loser,
                rank: loserPlayer.rank,
            },
        };
    }
};
exports.MatchController = MatchController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MatchController.prototype, "getAllMatches", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MatchController.prototype, "publishMatchResult", null);
exports.MatchController = MatchController = __decorate([
    (0, common_1.Controller)('api/match'),
    __metadata("design:paramtypes", [player_service_1.PlayerService,
        match_service_1.MatchService,
        app_service_1.AppService])
], MatchController);
//# sourceMappingURL=match.controller.js.map