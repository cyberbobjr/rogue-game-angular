import {TestBed} from '@angular/core/testing';
import {MapBuilder} from 'src/app/core/factories/map-builder';
import {GameMap} from 'src/app/core/classes/base/game-map';

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
    expect(map.getAllChestsPosition().length)
      .toEqual(0);
  });

  it('map created with Entities', () => {
    const map: GameMap = new MapBuilder().withRandomEntities(10)
                                         .build();
    expect(map.entities.length)
      .toEqual(10);
  });

  it('map created with Chests', () => {
    const map: GameMap = new MapBuilder().withRandomChests(10)
                                         .build();
    expect(map.getAllChestsPosition().length)
      .toEqual(10);
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
