import {async, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {StorageService} from './storage.service';
import {Player} from "../../../core/classes/entities/player";
import {GameClassFactory} from "../../../core/factories/game-class-factory";
import {ClassType} from "../../../core/enums/class-type.enum";
import {RaceFactory} from "../../../core/factories/race-factory";
import {RaceType} from "../../../core/enums/race-type.enum";

describe('StorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StorageService = TestBed.get(StorageService);
    expect(service)
      .toBeTruthy();
  });

  it('should save and load Player', async () => {
    try {
      const service: StorageService = TestBed.get(StorageService);
      const abilities: Map<string, number> = new Map([
        ['strength', 10],
        ['dexterity', 11],
        ['constitution', 12],
        ['intelligence', 13],
        ['wisdom', 14],
        ['charisma', 15]
      ]);
      const player: Player = new Player().setGameClass(GameClassFactory.getInstance()
                                                                       .createGameClass(ClassType.BARBARIAN))
                                         .setRace(RaceFactory.getInstance()
                                                             .createRace(RaceType.HUMAN))
                                         .withAbilities(abilities) as Player;
      service.savePlayer(player);
      const playerSaved: Player = await service.loadPlayer();
      expect(player.toJSON())
        .toEqual(playerSaved.toJSON());
      expect(playerSaved.strength)
        .toEqual(10);
    } catch (e) {
      console.log(e);
    }
  })
});
