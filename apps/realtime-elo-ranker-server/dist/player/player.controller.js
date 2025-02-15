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
exports.PlayerController = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const player_service_1 = require("./player.service");
const app_service_1 = require("../app.service");
const common_3 = require("@nestjs/common");
let PlayerController = class PlayerController {
    constructor(playerService, AppService) {
        this.playerService = playerService;
        this.AppService = AppService;
    }
    getPlayers() {
        return this.playerService.getPlayers();
    }
    addPlayer(id) {
        if (!id) {
            return {
                ok: false,
                code: 400,
                message: 'Il manque un id',
            };
        }
        this.playerService.getPlayer(id).then((player) => {
            if (player) {
                return {
                    ok: false,
                    code: 400,
                    message: 'Le joueur existe déjà',
                };
            }
            else {
                this.playerService.addPlayer(id);
                this.AppService.notifyObservers({ id: id, rank: 1000 });
                return {
                    ok: true,
                    code: 200,
                    message: 'Joueur ajouté',
                };
            }
        });
    }
};
exports.PlayerController = PlayerController;
__decorate([
    (0, common_2.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PlayerController.prototype, "getPlayers", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_3.Body)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PlayerController.prototype, "addPlayer", null);
exports.PlayerController = PlayerController = __decorate([
    (0, common_1.Controller)('api/player'),
    __metadata("design:paramtypes", [player_service_1.PlayerService,
        app_service_1.AppService])
], PlayerController);
//# sourceMappingURL=player.controller.js.map