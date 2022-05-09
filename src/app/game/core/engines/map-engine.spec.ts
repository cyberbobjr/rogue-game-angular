import {TestBed} from '@angular/core/testing';

import {MapEngine} from './map-engine';
import {StorageEngine} from '@services/storage-engine.service';
import {Position2D} from '@core/core/base/position2D';
import {Tile} from '@core/core/base/tile';
import {MapBuilder} from '@core/factories/map-builder';
import {GameMap} from '@core/interfaces/GameMap';
import {GameEngineImp} from '@services/game-engine-imp.service';

describe('Map Engine', () => {
    beforeEach(() => TestBed.configureTestingModule({
        providers: [
            StorageEngine,
            GameEngineImp
        ]
    }));

    it('should be created', () => {
        const service: MapEngine = new MapEngine();
        expect(service)
            .toBeTruthy();
    });

    it('should create a bunch of maps', async () => {
        const numberOfMap = 1;
        const map: Array<GameMap> = await MapBuilder.generateMaps(numberOfMap);
        expect(map.length)
            .toEqual(numberOfMap);
        const currentMap: GameMap = map[0];
        const tile: Tile = currentMap.getTileAt(new Position2D(currentMap.height - 1, currentMap.width - 1));
        expect(tile instanceof Tile)
            .toBeTruthy();
        expect(tile.isWalkable())
            .toBeFalsy();
    });
});
