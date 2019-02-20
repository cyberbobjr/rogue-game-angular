import {Player} from '../entities/player';
import {GameClassFactory} from '../../factories/game-class-factory';
import {ClassType} from '../../enums/class-type.enum';
import {RaceFactory} from '../../factories/race-factory';
import {RaceType} from '../../enums/race-type.enum';
import {GameMap} from '../base/game-map';
import {MapBuilder} from '../../factories/map-builder';
import {AttackDistanceAction} from './attack-distance-action';
import {GameEngineService} from '../../../modules/game/services/game-engine.service';
import {TestBed} from '@angular/core/testing';
import {SharedModule} from '../../../modules/shared/shared.module';
import {RouterTestingModule} from '@angular/router/testing';
import {ActionResult} from './action-result';
import {EntitiesService} from '../../../modules/game/services/entities.service';
import {Entity} from '../base/entity';
import {Position} from '../base/position';
import {Direction} from '../../enums/direction.enum';
import {MapEngine} from '../../../modules/game/services/map-engine.service';
import {StorageService} from '../../../modules/game/services/storage.service';

describe('attack-distance-action', () => {
  let player: Player = null;
  let gameMap: GameMap;
  let entitiesService: EntitiesService;
  let gameEngine: GameEngineService;

  beforeEach(() => {
    TestBed.configureTestingModule({
                                     imports: [SharedModule,
                                               RouterTestingModule],
                                     providers: [EntitiesService,
                                                 GameEngineService,
                                                 MapEngine,
                                                 StorageService]
                                   });
    entitiesService = TestBed.get(EntitiesService);
    gameEngine = TestBed.get(GameEngineService);
    gameMap = new MapBuilder().withRandomEntities(5)
                              .build();
    gameEngine.loadGameMap(gameMap, gameMap.entities);
    player = new Player().setGameClass(GameClassFactory.getInstance()
                                                       .createGameClass(ClassType.BARBARIAN))
                         .setRace(RaceFactory.getInstance()
                                             .createRace(RaceType.HUMAN))
                         .setMapLevelAndPosition(gameMap.level, gameMap.entryPosition);
  });

  it('should be created', () => {
    const attackAction: AttackDistanceAction = new AttackDistanceAction(player);
    expect(attackAction)
      .toBeTruthy();
  });

  it('should be succeed without ennemy in range', () => {
    entitiesService.setPlayer(player);
    const gameEngineService: GameEngineService = TestBed.get(GameEngineService);
    gameEngineService.loadGameMap(gameMap, entitiesService.getEntities());

    const attackAction: AttackDistanceAction = new AttackDistanceAction(player);
    const actionResult: ActionResult = attackAction.execute(player, gameEngineService);
    expect(actionResult)
      .toEqual(ActionResult.SUCCESS);
  });

  it('should be waited with ennemy in range', () => {
    entitiesService.setPlayer(player);
    const gameEngineService: GameEngineService = TestBed.get(GameEngineService);
    const entities: Array<Entity> = entitiesService.getEntities();
    const entityPosition: Position = entities[0].position;
    gameEngineService.loadGameMap(gameMap, entities);
    player.setMapLevelAndPosition(1, entityPosition.computeDestination(Direction.E));
    entitiesService.drawEntities(gameMap);
    gameMap.computeLOSMap(player);

    const attackAction: AttackDistanceAction = new AttackDistanceAction(player);
    const actionResult: ActionResult = attackAction.execute(player, gameEngineService);
    expect(actionResult)
      .toEqual(ActionResult.WAIT);
  });
});
