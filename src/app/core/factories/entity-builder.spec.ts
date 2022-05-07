import {TestBed} from '@angular/core/testing';
import {EntityBuilder} from './entity-builder';
import {GameMapImp} from '../classes/base/game-map-imp';
import {MapBuilder} from './map-builder';
import {GameEntities} from '../classes/base/game-entities';

describe('MapBuilder', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should create Game Entities', () => {
    const gameMap: GameMapImp = new MapBuilder().build();
    const maxEntities = 5;
    const gameEntities: GameEntities = EntityBuilder.generateMonsters([], maxEntities, gameMap);
    expect(gameEntities.getEntities().length).toEqual(maxEntities);
  });
});
