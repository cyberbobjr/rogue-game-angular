import {TestBed} from '@angular/core/testing';
import {MapBuilder} from 'src/app/core/factories/map-builder';
import {GameMap} from 'src/app/core/classes/base/game-map';
import {ChestTile} from '../classes/tiles/chest-tile';

describe('MapBuilder', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('empty map created', () => {
    const map: GameMap = new MapBuilder().build();
    expect(map.width)
      .toEqual(80);
    expect(map.level)
      .toEqual(1);
    expect(map.entities.length)
      .toEqual(0);
    expect(map.getAllPosition<ChestTile>(ChestTile).length)
      .toEqual(0);
  });

  it('map created with Entities', () => {
    const map: GameMap = new MapBuilder().withRandomEntities(10)
                                         .build();
    expect(map.entities.length)
      .toEqual(10);
  });

  it('map created with Chests', () => {
    const nbChest = 2;
    const map: GameMap = new MapBuilder().withRandomChests(nbChest)
                                         .build();
    expect(map.getAllPosition<ChestTile>(ChestTile).length).toBeCloseTo(nbChest);
  });

  it('map created with size', () => {
    const map: GameMap = new MapBuilder().withSize(100, 100)
                                         .build();
    expect(map.height)
      .toEqual(100);
    expect(map.width)
      .toEqual(100);
  });
});
