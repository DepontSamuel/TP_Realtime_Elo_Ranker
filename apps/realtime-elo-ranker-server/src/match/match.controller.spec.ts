import { Test, TestingModule } from '@nestjs/testing';
import { MatchController } from './match.controller';
import { PlayerService } from '../player/player.service';
import { MatchService } from './match.service';
import { AppService } from '../app.service';

describe('MatchController', () => {
  let controller: MatchController;
  let playerService: PlayerService;
  let matchService: MatchService;
  let appService: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MatchController],
      providers: [
        {
          provide: PlayerService,
          useValue: {
            getPlayer: jest.fn(),
            updatePlayer: jest.fn(),
          },
        },
        {
          provide: MatchService,
          useValue: {
            getMatches: jest.fn(),
            addMatch: jest.fn(),
          },
        },
        {
          provide: AppService,
          useValue: {
            notifyObservers: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<MatchController>(MatchController);
    playerService = module.get<PlayerService>(PlayerService);
    matchService = module.get<MatchService>(MatchService);
    appService = module.get<AppService>(AppService);
  });

  it('devrait être défini', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllMatches', () => {
    it('devrait retourner tous les matchs', async () => {
      const mockMatches = [{ winner: '1', loser: '2' }];
      matchService.getMatches = jest.fn().mockResolvedValue(mockMatches);

      const result = await controller.getAllMatches();
      expect(result).toEqual(mockMatches);
      expect(matchService.getMatches).toHaveBeenCalled();
    });
  });

  describe('publishMatchResult', () => {
    it("devrait retourner 'Match nul' si draw est vrai", async () => {
      const result = await controller.publishMatchResult({
        winner: '',
        loser: '',
        draw: true,
      });

      expect(result).toEqual({
        ok: true,
        code: 200,
        message: 'Match nul',
      });
    });

    it("devrait retourner une erreur s'il manque un joueur", async () => {
      const result = await controller.publishMatchResult({
        winner: '1',
        loser: '',
        draw: false,
      });

      expect(result).toEqual({
        ok: false,
        code: 400,
        message: 'Il manque un joueur',
      });
    });

    it("devrait retourner une erreur si un joueur n'existe pas", async () => {
      playerService.getPlayer = jest.fn().mockResolvedValueOnce(null);

      const result = await controller.publishMatchResult({
        winner: '1',
        loser: '2',
        draw: false,
      });

      expect(result).toEqual({
        ok: false,
        code: 400,
        message: "Un des joueurs n'existe pas",
      });
    });

    it('devrait calculer et mettre à jour le classement des joueurs', async () => {
      const winner = { id: '1', rank: 1200 };
      const loser = { id: '2', rank: 1000 };

      playerService.getPlayer = jest
        .fn()
        .mockResolvedValueOnce(winner)
        .mockResolvedValueOnce(loser);
      playerService.updatePlayer = jest.fn();
      matchService.addMatch = jest.fn();
      appService.notifyObservers = jest.fn();

      const result = await controller.publishMatchResult({
        winner: '1',
        loser: '2',
        draw: false,
      });

      expect(playerService.getPlayer).toHaveBeenCalledTimes(2);
      expect(playerService.updatePlayer).toHaveBeenCalledTimes(2);
      expect(matchService.addMatch).toHaveBeenCalledWith({
        winner: '1',
        loser: '2',
      });
      expect(appService.notifyObservers).toHaveBeenCalledTimes(2);

      expect(result).toMatchObject({
        ok: true,
        code: 200,
        winner: { id: '1' },
        loser: { id: '2' },
      });
    });
  });
});
