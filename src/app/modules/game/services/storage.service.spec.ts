import {TestBed} from '@angular/core/testing';

import {StorageEngine} from './storage-engine.service';
import {Player} from '../../../core/classes/entities/player';
import {GameClassFactory} from '../../../core/factories/game-class-factory';
import {ClassType} from '../../../core/enums/class-type.enum';
import {RaceFactory} from '../../../core/factories/race-factory';
import {RaceType} from '../../../core/enums/race-type.enum';
import {GameMap} from '../../../core/classes/base/game-map';
import {MapBuilder} from '../../../core/factories/map-builder';
import {JsonEntity, JsonMap} from '../../../core/interfaces/json-interfaces';
import {EntitiesEngine} from './entities-engine.service';
import {AttributeSystem} from '../../../core/classes/base/AttributeSystem';

describe('StorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({providers: [EntitiesEngine]}));

  it('should be created', () => {
    const service: StorageEngine = TestBed.get(StorageEngine);
    expect(service)
      .toBeTruthy();
  });

  it('should save and load Player', async (done) => {
    try {
      const service: StorageEngine = TestBed.get(StorageEngine);
      const abilities = new AttributeSystem({
                                              strength: 10, dexterity: 11, constitution: 12, intelligence: 13, wisdom: 14, charisma: 15
                                            });
      const player: Player = new Player().setGameClass(GameClassFactory.getInstance()
                                                                       .createGameClass(ClassType.BARBARIAN))
                                         .setRace(RaceFactory.getInstance()
                                                             .createRace(RaceType.HUMAN))
                                         .setAttributes(abilities) as Player;
      await service.savePlayer(player);
      const playerSaved: Player = await service.loadPlayer();
      expect(player.toJSON())
        .toEqual(playerSaved.toJSON());
      expect(playerSaved.strength)
        .toEqual(10);
      done();
    } catch (e) {
      console.log(e);
    }
  });

  it('should save and load map', async (done) => {
    const level = 1;
    const service: StorageEngine = TestBed.get(StorageEngine);
    const gameMap: GameMap = new MapBuilder().withLevel(level)
                                             .withSeed(511)
                                             .build();
    await service.saveMap(gameMap);
    const mapData: { map: JsonMap, entities: Array<JsonEntity> } = await service.loadRawMap(level);
    const mapLoaded: GameMap = MapBuilder.fromJSON(mapData.map);
    expect(mapLoaded.level)
      .toEqual(gameMap.level);
    expect(mapLoaded.content)
      .toEqual(gameMap.content);
    done();
  });
});
