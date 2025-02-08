import { Test, TestingModule } from '@nestjs/testing';
import { RankingController } from './ranking.controller';
import { PlayerService } from '../player/player.service';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('RankingController', () => {
  let controller: RankingController;
  let playerService: PlayerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RankingController],
      providers: [
        {
          provide: PlayerService,
          useValue: {
            getPlayers: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<RankingController>(RankingController);
    playerService = module.get<PlayerService>(PlayerService);
  });

  it('devrait être défini', () => {
    expect(controller).toBeDefined();
  });

  describe('getRanking', () => {
    it('devrait retourner une liste de joueurs si elle existe', async () => {
      const mockPlayers = [
        { id: '1', rank: 1000 },
        { id: '2', rank: 900 },
      ];
      playerService.getPlayers = jest.fn().mockResolvedValue(mockPlayers);

      const result = await controller.getRanking();
      expect(result).toEqual(mockPlayers);
      expect(playerService.getPlayers).toHaveBeenCalled();
    });

    it("devrait lever une exception 404 si aucun joueur n'existe", async () => {
      playerService.getPlayers = jest.fn().mockResolvedValue([]);

      await expect(controller.getRanking()).rejects.toThrow(
        new HttpException(
          {
            ok: false,
            code: 404,
            message:
              "Le classement n'est pas disponible car aucun joueur n'existe",
          },
          HttpStatus.NOT_FOUND,
        ),
      );
    });
  });
});
