import { Test, TestingModule } from '@nestjs/testing';
import { RankingEventsController } from './ranking.events.controller';
import { AppService } from '../../app.service';
import { Observable } from 'rxjs';
import { EventEmitter } from 'events';

describe('RankingEventsController', () => {
  let controller: RankingEventsController;
  let appService: AppService;
  let mockEventEmitter: EventEmitter;

  beforeEach(async () => {
    mockEventEmitter = new EventEmitter();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [RankingEventsController],
      providers: [
        {
          provide: AppService,
          useValue: {
            getEventEmitter: jest.fn().mockReturnValue(mockEventEmitter),
          },
        },
      ],
    }).compile();

    controller = module.get<RankingEventsController>(RankingEventsController);
    appService = module.get<AppService>(AppService);
  });

  it('devrait être défini', () => {
    expect(controller).toBeDefined();
  });

  describe('subscribeToRankingUpdates', () => {
    it('devrait retourner un Observable', () => {
      const observable = controller.subscribeToRankingUpdates();
      expect(observable).toBeInstanceOf(Observable);
    });

    it("devrait émettre un événement 'RankingUpdate'", (done) => {
      const observable = controller.subscribeToRankingUpdates();

      observable.subscribe({
        next: (event) => {
          expect(event).toEqual(
            new MessageEvent('message', {
              data: {
                type: 'RankingUpdate',
                player: { id: '123', rank: 1500 },
              },
            }),
          );
          done();
        },
      });

      mockEventEmitter.emit('RankingUpdate', { id: '123', rank: 1500 });
    });

    it("devrait gérer une erreur lorsqu'un événement 'error' est émis", (done) => {
      const observable = controller.subscribeToRankingUpdates();

      observable.subscribe({
        error: (err) => {
          expect(err).toBe('Erreur de test');
          done();
        },
      });

      mockEventEmitter.emit('error', 'Erreur de test');
    });

    it('devrait se désabonner correctement des événements', () => {
      const observable = controller.subscribeToRankingUpdates();
      const subscription = observable.subscribe();

      expect(mockEventEmitter.listenerCount('RankingUpdate')).toBe(1);
      expect(mockEventEmitter.listenerCount('error')).toBe(1);

      subscription.unsubscribe();

      expect(mockEventEmitter.listenerCount('RankingUpdate')).toBe(0);
      expect(mockEventEmitter.listenerCount('error')).toBe(0);
    });
  });
});
