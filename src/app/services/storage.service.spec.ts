import {TestBed} from '@angular/core/testing';

import {StorageEngine} from './storage-engine.service';
import {Player} from '@core/core/entities/player';
import {GameClassFactory} from '@core/factories/game-class-factory';
import {ClassType} from '@core/enums/class-type.enum';
import {RaceFactory} from '@core/factories/race-factory';
import {RaceType} from '@core/enums/race-type.enum';
import {GameMapImp} from '@core/core/base/game-map-imp';
import {MapBuilder} from '@core/factories/map-builder';
import {JsonEntity, JsonMap} from '@core/interfaces/json-interfaces';
import {AttributeSystem} from '@core/core/base/AttributeSystem';
import {GameEntities} from '@core/core/base/game-entities';
import {EntityBuilder} from '@core/factories/entity-builder';

describe('StorageService', () => {
    beforeEach(() => TestBed.configureTestingModule({providers: []}));

    it('should be created', () => {
        const service: StorageEngine = TestBed.get(StorageEngine);
        expect(service)
            .toBeTruthy();
    });

    it('should save and load Player', async () => {
        try {
            const storageEngine: StorageEngine = TestBed.get(StorageEngine);
            const abilities = new AttributeSystem({
                strength: 10, dexterity: 11, constitution: 12, intelligence: 13, wisdom: 14, charisma: 15
            });
            const player: Player = new Player().setGameClass(GameClassFactory.getInstance()
                                                                             .createGameClass(ClassType.BARBARIAN))
                                               .setRace(RaceFactory.getInstance()
                                                                   .createRace(RaceType.HUMAN))
                                               .setAttributes(abilities) as Player;
            await storageEngine.savePlayer(player);
            const playerSaved: Player = await storageEngine.loadPlayer();
            expect(player.toJSON())
                .toEqual(playerSaved.toJSON());
            expect(playerSaved.strength)
                .toEqual(10);
        } catch (e) {
            console.log(e);
        }
    });

    it('should save and load map', async () => {
        const level = 1;
        const service: StorageEngine = TestBed.get(StorageEngine);
        const gameMap: GameMapImp = new MapBuilder().withLevel(level)
                                                    .withSeed(511)
                                                    .build();
        const gameEntities: GameEntities = EntityBuilder.generateEntitiesOnMap([], 5, gameMap);
        await service.saveMap(gameMap, gameEntities);
        const mapData: { map: JsonMap, entities: Array<JsonEntity> } = await service.loadRawMap(level);
        const mapLoaded: GameMapImp = MapBuilder.fromJSON(mapData.map);
        expect(mapLoaded.level)
            .toEqual(gameMap.level);
        expect(mapLoaded.content)
            .toEqual(gameMap.content);
    });
});
