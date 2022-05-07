import {Player} from '../entities/player';
import {GameClassFactory} from '../../factories/game-class-factory';
import {ClassType} from '../../enums/class-type.enum';
import {RaceFactory} from '../../factories/race-factory';
import {RaceType} from '../../enums/race-type.enum';
import {GameMapImp} from '../base/game-map-imp';
import {MapBuilder} from '../../factories/map-builder';
import {FireAction} from './fire-action';
import {GameEngineService} from '../../../services/game-engine-imp.service';
import {TestBed} from '@angular/core/testing';
import {SharedModule} from '../../../modules/shared/shared.module';
import {RouterTestingModule} from '@angular/router/testing';
import {ActionResult} from './action-result';
import {EntitiesEngine} from '../../../services/entities-engine.service';
import {Entity} from '../base/entity';
import {Direction} from '../../enums/direction.enum';
import {MapEngine} from '../../../services/map-engine.service';
import {StorageEngine} from '../../../services/storage-engine.service';
import {EntityBuilder} from '../../factories/entity-builder';

describe('Fire action', () => {
  let player: Player = null;
  let gameMap: GameMapImp;
  let entitiesService: EntitiesEngine;
  let gameEngine: GameEngineService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule
      ],
      providers: [
        EntitiesEngine,
        GameEngineService,
        MapEngine,
        StorageEngine
      ]
    });
    entitiesService = TestBed.get(EntitiesEngine);
    gameEngine = TestBed.get(GameEngineService);
    gameMap = new MapBuilder().build();
    gameEngine.loadGame(gameMap, entitiesService.getGameEntities());
    player = new Player().setGameClass(GameClassFactory.getInstance()
                                                       .createGameClass(ClassType.BARBARIAN))
                         .setRace(RaceFactory.getInstance()
                                             .createRace(RaceType.HUMAN))
                         .setMapLevelAndPosition(gameMap.level, gameMap.entryPosition);
    entitiesService.setGameEntities(EntityBuilder.generateMonsters([], 5, gameMap));
    entitiesService.setPlayer(player);
  });

  it('should be created', () => {
    const attackAction: FireAction = new FireAction();
    expect(attackAction)
      .toBeTruthy();
  });

  it('should be succeed without ennemy in range', () => {
    const attackAction: FireAction = new FireAction();
    const actionResult: ActionResult = attackAction.execute(player, gameEngine);
    expect(actionResult)
      .toEqual(ActionResult.SUCCESS);
  });

  it('should be waited with ennemy in range', () => {
    const entities: Array<Entity> = entitiesService.getAllEntities();
    const mainActor: Entity = (player as Entity);
    gameEngine.loadGame(gameMap, entitiesService.getGameEntities());
    gameMap.computeLOSMap(mainActor);
    entities[0].position = gameMap.entryPosition.computeDestination(Direction.N);
    const attackAction: FireAction = new FireAction();
    const actionResult: ActionResult = attackAction.execute(player, gameEngine);
    expect(actionResult)
      .toEqual(ActionResult.WAIT);
  });

  it('should get info', () => {
    expect((new FireAction()).getInfo())
      .toEqual('Fire action');
  });
});
