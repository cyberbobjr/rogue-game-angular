import {Player} from '../entities/player';
import {GameClassFactory} from '../../factories/game-class-factory';
import {ClassType} from '../../enums/class-type.enum';
import {RaceFactory} from '../../factories/race-factory';
import {RaceType} from '../../enums/race-type.enum';
import {GameMap} from '../base/game-map';
import {MapBuilder} from '../../factories/map-builder';
import {AttackDistanceAction} from './attack-distance-action';
import {GameEngine} from '../../../modules/game/services/game-engine.service';
import {TestBed} from '@angular/core/testing';
import {SharedModule} from '../../../modules/shared/shared.module';
import {RouterTestingModule} from '@angular/router/testing';
import {ActionResult} from './action-result';
import {EntitiesEngine} from '../../../modules/game/services/entities-engine.service';
import {Entity} from '../base/entity';
import {Direction} from '../../enums/direction.enum';
import {MapEngine} from '../../../modules/game/services/map-engine.service';
import {StorageService} from '../../../modules/game/services/storage.service';

describe('attack-distance-action', () => {
  let player: Player = null;
  let gameMap: GameMap;
  let entitiesService: EntitiesEngine;
  let gameEngine: GameEngine;

  beforeEach(() => {
    TestBed.configureTestingModule({
                                     imports: [SharedModule,
                                               RouterTestingModule],
                                     providers: [EntitiesEngine,
                                                 GameEngine,
                                                 MapEngine,
                                                 StorageService]
                                   });
    entitiesService = TestBed.get(EntitiesEngine);
    gameEngine = TestBed.get(GameEngine);
    gameMap = new MapBuilder().withRandomEntities(5)
                              .build();
    gameEngine.loadGameMap(gameMap);
    player = new Player().setGameClass(GameClassFactory.getInstance()
                                                       .createGameClass(ClassType.BARBARIAN))
                         .setRace(RaceFactory.getInstance()
                                             .createRace(RaceType.HUMAN))
                         .setMapLevelAndPosition(gameMap.level, gameMap.entryPosition);
    entitiesService.setPlayer(player);
  });

  it('should be created', () => {
    const attackAction: AttackDistanceAction = new AttackDistanceAction(player);
    expect(attackAction)
      .toBeTruthy();
  });

  it('should be succeed without ennemy in range', () => {
    const attackAction: AttackDistanceAction = new AttackDistanceAction(player);
    const actionResult: ActionResult = attackAction.execute(player, gameEngine);
    expect(actionResult)
      .toEqual(ActionResult.SUCCESS);
  });

  it('should be waited with ennemy in range', () => {
    const entities: Array<Entity> = gameMap.gameEntities.getEntities();
    gameEngine.loadGameMap(gameMap);
    gameMap.computeLOSMap(player);
    entities[0].position = gameMap.entryPosition.computeDestination(Direction.N);
    const attackAction: AttackDistanceAction = new AttackDistanceAction(player);
    const actionResult: ActionResult = attackAction.execute(player, gameEngine);
    expect(actionResult)
      .toEqual(ActionResult.WAIT);
  });
});
