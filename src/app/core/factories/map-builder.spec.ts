import {TestBed} from '@angular/core/testing';
import {MapBuilder} from 'src/app/core/factories/map-builder';
import {GameMapImp} from 'src/app/core/classes/base/game-map-imp';
import {ChestTile} from '../classes/tiles/chest-tile';

describe('MapBuilder', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('empty map created', () => {
    const map: GameMapImp = new MapBuilder().build();
    expect(map.width)
      .toEqual(80);
    expect(map.level)
      .toEqual(1);
    expect(map.getAllPosition<ChestTile>(ChestTile).length)
      .toEqual(0);
  });

  it('map created with Entities', () => {
    const map: GameMapImp = new MapBuilder().build();
    expect(map.level)
      .toEqual(1);
  });

  it('map created with Chests', () => {
    const nbChest = 2;
    const map: GameMapImp = new MapBuilder().withRandomChests(nbChest)
                                            .build();
    expect(map.getAllPosition<ChestTile>(ChestTile).length).toBeGreaterThan(nbChest - 1);
  });

  it('map created with size', () => {
    const map: GameMapImp = new MapBuilder().withSize(100, 100)
                                            .build();
    expect(map.height)
      .toEqual(100);
    expect(map.width)
      .toEqual(100);
  });
});
