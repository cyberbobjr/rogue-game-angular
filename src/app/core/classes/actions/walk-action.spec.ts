import {Player} from '../entities/player';
import {GameClassFactory} from '../../factories/game-class-factory';
import {ClassType} from '../../enums/class-type.enum';
import {RaceFactory} from '../../factories/race-factory';
import {RaceType} from '../../enums/race-type.enum';
import {GameMap} from '../base/game-map';
import {MapBuilder} from '../../factories/map-builder';
import {GameEngineService} from '../../../modules/game/services/game-engine.service';
import {TestBed} from '@angular/core/testing';
import {SharedModule} from '../../../modules/shared/shared.module';
import {RouterTestingModule} from '@angular/router/testing';
import {EntitiesService} from '../../../modules/game/services/entities.service';
import {WalkAction} from './walk-action';
import {Direction} from '../../enums/direction.enum';
import {Position} from '../base/position';
import {ActionResult} from './action-result';

describe('walk-action', () => {
  let player: Player = null;
  let gameMap: GameMap;
  let gameEngine: GameEngineService;
  let entitiesService: EntitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
                                     imports: [SharedModule,
                                               RouterTestingModule],
                                     providers: [EntitiesService, GameEngineService]
                                   });
    gameMap = new MapBuilder().withRandomChests(5)
                              .build();
    player = new Player().setGameClass(GameClassFactory.getInstance()
                                                       .createGameClass(ClassType.BARBARIAN))
                         .setRace(RaceFactory.getInstance()
                                             .createRace(RaceType.HUMAN))
                         .setMapLevelAndPosition(gameMap.level, gameMap.entryPosition);
    gameEngine = TestBed.get(GameEngineService);
    gameEngine.loadGameMap(gameMap);
    entitiesService = TestBed.get(EntitiesService);
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
