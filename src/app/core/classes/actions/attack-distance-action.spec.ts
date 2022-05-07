import {Player} from '../entities/player';
import {GameMapImp} from '../base/game-map-imp';
import {EntitiesEngine} from '../../../services/entities-engine.service';
import {GameEngineService} from '../../../services/game-engine-imp.service';
import {TestBed} from '@angular/core/testing';
import {SharedModule} from '../../../modules/shared/shared.module';
import {RouterTestingModule} from '@angular/router/testing';
import {MapEngine} from '../../../services/map-engine.service';
import {StorageEngine} from '../../../services/storage-engine.service';
import {MapBuilder} from '../../factories/map-builder';
import {GameClassFactory} from '../../factories/game-class-factory';
import {ClassType} from '../../enums/class-type.enum';
import {RaceFactory} from '../../factories/race-factory';
import {RaceType} from '../../enums/race-type.enum';
import {AttackDistanceAction} from './attack-distance-action';
import {EntitiesFactory} from '../../factories/entities-factory';
import {EntityType} from '../../enums/entity-type.enum';
import {Entity} from '../base/entity';
import {EntityBuilder} from '../../factories/entity-builder';

describe('Attack distance action', () => {
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
    gameMap = new MapBuilder().build();
    player = new Player().setGameClass(GameClassFactory.getInstance()
                                                       .createGameClass(ClassType.BARBARIAN))
                         .setRace(RaceFactory.getInstance()
                                             .createRace(RaceType.HUMAN))
                         .setMapLevelAndPosition(gameMap.level, gameMap.entryPosition);
    entitiesService = TestBed.get(EntitiesEngine);
    gameEngine = TestBed.get(GameEngineService);
    entitiesService.setGameEntities(EntityBuilder.generateMonsters([], 5, gameMap));
    gameEngine.loadGame(gameMap, entitiesService.getGameEntities(), player);
  });

  it('should be created', () => {
    const monster: Entity = EntitiesFactory.getInstance()
                                           .createEntity(EntityType.MONSTER);
    const attackAction: AttackDistanceAction = new AttackDistanceAction(monster);
    expect(attackAction)
      .toBeTruthy();
  });

  it('should do damage on entity', () => {
    const attackAction: AttackDistanceAction = new AttackDistanceAction(player);
    const entity: Entity = entitiesService.getAllEntities()[0];
    entity.dexterity = 100;
    player.onHit = function (damage: number) {
      player.hp = 0;
    };
    attackAction.execute(entity, gameEngine);
    expect(player.hp)
      .toEqual(0);
  });
});
