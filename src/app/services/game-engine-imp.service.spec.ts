import {TestBed} from '@angular/core/testing';

import {GameEngineImp} from './game-engine-imp.service';
import {SharedModule} from '../modules/shared/shared.module';
import {RouterTestingModule} from '@angular/router/testing';
import {GameEngine} from '@core/core/engines/GameEngine';
import {GameMapImp} from '@core/core/base/game-map-imp';
import {MapBuilder} from '@core/factories/map-builder';
import {GameEntities} from '@core/core/base/game-entities';
import {EntityBuilder} from '@core/factories/entity-builder';
import {EntityType} from '@core/enums/entity-type.enum';
import {EntitiesFactory} from '@core/factories/entities-factory';
import {Player} from '@core/core/entities/player';

describe('GameEngine', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            SharedModule,
            RouterTestingModule
        ],
        providers: [
            GameEngineImp
        ]
    }));

    it('should be created', () => {
        const service: GameEngine = TestBed.get(GameEngineImp);
        expect(service)
            .toBeTruthy();
    });

    it('should load game', () => {
        const maxEntities = 5;
        const width = 20;
        const height = 10;
        const gameEngine: GameEngine = TestBed.get(GameEngineImp);
        const gameMap: GameMapImp = new MapBuilder().withSize(width, height).build();
        const gameEntities: GameEntities = EntityBuilder.generateEntitiesOnMap([], maxEntities, gameMap);
        gameEngine.loadGame(gameMap, gameEntities, null);
        expect(gameEngine.getEntityEngine().getAllEntities().length).toEqual(maxEntities);
        expect(gameEngine.getMapEngine().getCurrentMap().width).toEqual(width);
        expect(gameEngine.getMapEngine().getCurrentMap().height).toEqual(height);
    });

    it('should return tile or entity at position', () => {
        const gameEngine: GameEngine = TestBed.get(GameEngineImp);
        const gameMap: GameMapImp = new MapBuilder().build();
        const player: Player = EntitiesFactory.getInstance().createEntity(EntityType.PLAYER) as Player;
        player.setMapLevelAndPosition(gameMap.level, gameMap.entryPosition);
        const gameEntities: GameEntities = EntityBuilder.generateEntitiesOnMap([], 0, gameMap);
        gameEngine.loadGame(gameMap, gameEntities, player);
        expect(gameEngine.getTileOrEntityAt(gameMap.entryPosition) instanceof Player).toBeTruthy();
    });
});
