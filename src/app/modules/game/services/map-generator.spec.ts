import {TestBed} from '@angular/core/testing';
import {MapGenerator} from 'src/app/modules/game/services/map-generator';
import {GameMap} from 'src/app/core/classes/base/game-map';

describe('MapGenerator', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MapGenerator = TestBed.get(MapGenerator);
    expect(service)
      .toBeTruthy();
  });

  it('map created', () => {
    const mapGen: MapGenerator = TestBed.get(MapGenerator);
    const map: GameMap = mapGen.generateNewMap(1);
    expect(map.width)
      .toEqual(80);
    expect(map.level)
      .toEqual(1);
  });
});
