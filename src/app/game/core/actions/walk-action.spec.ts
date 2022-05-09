import {Player} from '../entities/player';
import {GameClassFactory} from '../../factories/game-class-factory';
import {ClassType} from '../../enums/class-type.enum';
import {RaceFactory} from '../../factories/race-factory';
import {RaceType} from '../../enums/race-type.enum';
import {GameMapImp} from '../base/game-map-imp';
import {MapBuilder} from '../../factories/map-builder';
import {GameEngineImp} from '@services/game-engine-imp.service';
import {TestBed} from '@angular/core/testing';
import {SharedModule} from '../../../modules/shared/shared.module';
import {RouterTestingModule} from '@angular/router/testing';
import {EntitiesEngine} from '@core/core/engines/entities-engine';
import {WalkAction} from './walk-action';
import {Direction} from '../../enums/direction.enum';
import {Position2D} from '../base/position2D';
import {ActionResult} from './action-result';
import {EntityBuilder} from '../../factories/entity-builder';

describe('walk-action', () => {
    let player: Player = null;
    let gameMap: GameMapImp;
    let gameEngine: GameEngineImp;
    let entitiesService: EntitiesEngine;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                SharedModule,
                RouterTestingModule
            ],
            providers: [
                EntitiesEngine,
                GameEngineImp
            ]
        });
        gameMap = new MapBuilder().withRandomChests(5)
                                  .build();
        player = new Player().setGameClass(GameClassFactory.getInstance()
                                                           .createGameClass(ClassType.BARBARIAN))
                             .setRace(RaceFactory.getInstance()
                                                 .createRace(RaceType.HUMAN))
                             .setMapLevelAndPosition(gameMap.level, gameMap.entryPosition);
        gameEngine = TestBed.get(GameEngineImp);
        gameEngine.loadGame(gameMap, EntityBuilder.generateEntitiesOnMap([], 1, gameMap));
        entitiesService = TestBed.get(EntitiesEngine);
        entitiesService.setPlayer(player);
    });

    it('should be created', () => {
        const walkAction: WalkAction = new WalkAction(Direction.E, gameEngine);
        expect(walkAction)
            .toBeTruthy();
    });

    it('should change current position', () => {
        const currentPosition: Position2D = player.getPosition();
        const expectedPosition: Position2D = new Position2D(currentPosition.x + 1, currentPosition.y);
        const walkAction: WalkAction = new WalkAction(Direction.E, gameEngine);
        const actionResult: ActionResult = walkAction.execute(player);
        expect(actionResult.succeeded)
            .toBeTruthy();
        const newPosition: Position2D = player.getPosition();
        expect(newPosition)
            .toEqual(expectedPosition);
    });
});
