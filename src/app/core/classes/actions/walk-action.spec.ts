import {Player} from '../entities/player';
import {GameClassFactory} from '../../factories/game-class-factory';
import {ClassType} from '../../enums/class-type.enum';
import {RaceFactory} from '../../factories/race-factory';
import {RaceType} from '../../enums/race-type.enum';
import {GameMap} from '../base/game-map';
import {MapBuilder} from '../../factories/map-builder';
import {GameEngineImp} from '../../../modules/game/services/game-engine-imp.service';
import {TestBed} from '@angular/core/testing';
import {SharedModule} from '../../../modules/shared/shared.module';
import {RouterTestingModule} from '@angular/router/testing';
import {EntitiesEngine} from '../../../modules/game/services/entities-engine.service';
import {WalkAction} from './walk-action';
import {Direction} from '../../enums/direction.enum';
import {Position} from '../base/position';
import {ActionResult} from './action-result';
import {EntityBuilder} from '../../factories/entity-builder';

describe('walk-action', () => {
  let player: Player = null;
  let gameMap: GameMap;
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
    gameEngine.loadGameMap(gameMap, EntityBuilder.generateMonsters([], 1, gameMap));
    entitiesService = TestBed.get(EntitiesEngine);
    entitiesService.setPlayer(player);
  });

  it('should be created', () => {
    const walkAction: WalkAction = new WalkAction(Direction.E);
    expect(walkAction)
      .toBeTruthy();
  });

  it('should change current position', () => {
    const currentPosition: Position = player.getPosition();
    const expectedPosition: Position = new Position(currentPosition.x + 1, currentPosition.y);
    const walkAction: WalkAction = new WalkAction(Direction.E);
    const actionResult: ActionResult = walkAction.execute(player, gameEngine);
    expect(actionResult.succeeded)
      .toBeTruthy();
    const newPosition: Position = player.getPosition();
    expect(newPosition)
      .toEqual(expectedPosition);
  });
});
