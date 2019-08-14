import {TestBed} from '@angular/core/testing';

import {MapEngine} from './map-engine.service';
import {StorageEngine} from './storage-engine.service';
import {EntitiesEngine} from './entities-engine.service';
import {GameMap} from '../../../core/classes/base/game-map';
import {Position} from '../../../core/classes/base/position';
import {Tile} from '../../../core/classes/base/tile';
import {MapBuilder} from '../../../core/factories/map-builder';

describe('RotMapService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      StorageEngine,
      EntitiesEngine
    ]
  }));

  it('should be created', () => {
    const service: MapEngine = TestBed.get(MapEngine);
    expect(service)
      .toBeTruthy();
  });

  it('should create a bunch of maps', async () => {
    const numberOfMap = 1;
    const map: Array<GameMap> = await MapBuilder.generateMaps(numberOfMap);
    expect(map.length)
      .toEqual(numberOfMap);
    const currentMap: GameMap = map[0];
    const tile: Tile = currentMap.getTileAt(new Position(currentMap.height - 1, currentMap.width - 1));
    expect(tile instanceof Tile)
      .toBeTruthy();
    expect(tile.isWalkable())
      .toBeFalsy();
  });
});
