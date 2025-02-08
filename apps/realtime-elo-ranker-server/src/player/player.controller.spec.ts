import { Test, TestingModule } from '@nestjs/testing';
import { PlayerService } from './player.service';
import { Player } from '../model/player.entity';

jest.mock('../model/player.entity'); // Mock de l'entité Player

describe('PlayerService', () => {
  let service: PlayerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlayerService],
    }).compile();

    service = module.get<PlayerService>(PlayerService);
  });

  it('devrait être défini', () => {
    expect(service).toBeDefined();
  });

  describe('getPlayers', () => {
    it('devrait retourner une liste de joueurs', async () => {
      const mockPlayers = [
        { id: '1', rank: 1000 },
        { id: '2', rank: 900 },
      ];
      (Player.find as jest.Mock).mockResolvedValue(mockPlayers);

      const result = await service.getPlayers();
      expect(JSON.parse(result)).toEqual(mockPlayers);
    });
  });

  describe('getPlayer', () => {
    it('devrait retourner un joueur existant', async () => {
      const mockPlayer = { id: '1', rank: 1000 };
      (Player.findOne as jest.Mock).mockResolvedValue(mockPlayer);

      const result = await service.getPlayer('1');
      expect(result).toEqual(mockPlayer);
    });

    it("devrait retourner 'undefined' si le joueur n'existe pas", async () => {
      (Player.findOne as jest.Mock).mockResolvedValue(null);

      const result = await service.getPlayer('99');
      expect(result).toBeUndefined();
    });
  });

  describe('addPlayer', () => {
    it('devrait ajouter un joueur', async () => {
      (Player.insert as jest.Mock).mockResolvedValue(undefined);

      await service.addPlayer('3');
      expect(Player.insert).toHaveBeenCalledWith({ id: '3', rank: 1000 });
    });
  });
});
