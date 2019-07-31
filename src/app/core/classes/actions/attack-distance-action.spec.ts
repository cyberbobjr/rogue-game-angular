import {Player} from '../entities/player';
import {GameMap} from '../base/game-map';
import {EntitiesEngine} from '../../../modules/game/services/entities-engine.service';
import {GameEngine} from '../../../modules/game/services/game-engine.service';
import {TestBed} from '@angular/core/testing';
import {SharedModule} from '../../../modules/shared/shared.module';
import {RouterTestingModule} from '@angular/router/testing';
import {MapEngine} from '../../../modules/game/services/map-engine.service';
import {StorageService} from '../../../modules/game/services/storage.service';
import {MapBuilder} from '../../factories/map-builder';
import {GameClassFactory} from '../../factories/game-class-factory';
import {ClassType} from '../../enums/class-type.enum';
import {RaceFactory} from '../../factories/race-factory';
import {RaceType} from '../../enums/race-type.enum';
import {AttackDistanceAction} from './attack-distance-action';
import {EntitiesFactory} from '../../factories/entities-factory';
import {EntityType} from '../../enums/entity-type.enum';
import {Entity} from '../base/entity';
import {AttackMeleeAction} from './attack-melee-action';

describe('Attack distance action', () => {
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
    const monster: Entity = EntitiesFactory.getInstance()
                                           .createEntity(EntityType.MONSTER);
    const attackAction: AttackDistanceAction = new AttackDistanceAction(monster);
    expect(attackAction)
      .toBeTruthy();
  });

  it('should do damage on entity', () => {
    const attackAction: AttackDistanceAction = new AttackDistanceAction(player);
    const entity: Entity = gameMap.gameEntities.getEntities()[0];
    entity.dexterity = 100;
    player.onHit = function (damage: number) {
      player.hp = 0;
    };
    attackAction.execute(entity, gameEngine);
    expect(player.hp)
      .toEqual(0);
  });
});
