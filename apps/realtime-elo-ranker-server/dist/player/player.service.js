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
Object.defineProperty(exports, "__esModule", { value: true });
exports.playerService = void 0;
const common_1 = require("@nestjs/common");
const player_entity_1 = require("../model/player.entity");
const app_service_1 = require("../app.service");
let playerService = class playerService {
    constructor(appService) {
        this.appService = appService;
        this.players = [];
    }
    async getPlayers() {
        return this.players;
    }
    async addPlayer(id) {
        const player = new player_entity_1.Player();
        player.id = id;
        player.rank = 1000;
        this.players.push(player);
        this.appService.notifyObservers(player);
        return player;
    }
    async getPlayer(id) {
        const player = this.players.find((player) => player.id === id);
        if (!player) {
            throw new common_1.NotFoundException('Player not found');
        }
        return player;
    }
    async updatePlayer(player) {
        await this.getPlayer(player.id);
        this.players = this.players.map((p) => (p.id === player.id ? player : p));
    }
};
exports.playerService = playerService;
exports.playerService = playerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], playerService);
//# sourceMappingURL=player.service.js.map