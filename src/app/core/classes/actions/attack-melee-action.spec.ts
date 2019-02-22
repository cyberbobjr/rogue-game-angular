import {Player} from '../entities/player';
import {GameClassFactory} from '../../factories/game-class-factory';
import {ClassType} from '../../enums/class-type.enum';
import {RaceFactory} from '../../factories/race-factory';
import {RaceType} from '../../enums/race-type.enum';
import {GameMap} from '../base/game-map';
import {MapBuilder} from '../../factories/map-builder';
import {GameEngine} from '../../../modules/game/services/game-engine.service';
import {TestBed} from '@angular/core/testing';
import {SharedModule} from '../../../modules/shared/shared.module';
import {RouterTestingModule} from '@angular/router/testing';
import {EntitiesManager} from '../../../modules/game/services/entities-manager.service';
import {AttackMeleeAction} from './attack-melee-action';
import {Entity} from '../base/entity';

describe('attack-melee-action', () => {
  let player: Player = null;
  let gameMap: GameMap;
  let entitiesService: EntitiesManager;
  let gameEngine: GameEngine;

  beforeEach(() => {
    TestBed.configureTestingModule({
                                     imports: [SharedModule,
                                               RouterTestingModule],
                                     providers: [EntitiesManager, GameEngine]
                                   });
    entitiesService = TestBed.get(EntitiesManager);
    gameEngine = TestBed.get(GameEngine);
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
    const attackAction: AttackMeleeAction = new AttackMeleeAction(player);
    expect(attackAction)
      .toBeTruthy();
  });

  it('should do a attack on entity', () => {
    player.onHit = function (subject: Entity, damage: number) {
      player.hp = 0;
    };
    const attackAction: AttackMeleeAction = new AttackMeleeAction(player);
    const entity: Entity = entitiesService.getEntities()[0];
    attackAction.execute(entity, gameEngine);
    expect(player.hp)
      .toEqual(0);
  });
});
