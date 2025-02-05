"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.playerService = void 0;
const common_1 = require("@nestjs/common");
const player_entity_1 = require("../model/player.entity");
let playerService = class playerService {
    async getPlayers() {
        const players = await player_entity_1.Player.find({ order: { rank: 'DESC' } });
        return JSON.stringify(players);
    }
    async addPlayer(id) {
        await player_entity_1.Player.insert({ id: id, rank: 1000 });
    }
    async getPlayer(id) {
        const player = await player_entity_1.Player.findOne({ where: { id: id } });
        if (!player) {
            throw new common_1.NotFoundException(`Player with id ${id} not found`);
        }
        return player;
    }
    async updatePlayer(player) {
        await player_entity_1.Player.update({ id: player.id }, player);
    }
};
exports.playerService = playerService;
exports.playerService = playerService = __decorate([
    (0, common_1.Injectable)()
], playerService);
//# sourceMappingURL=player.service.js.map