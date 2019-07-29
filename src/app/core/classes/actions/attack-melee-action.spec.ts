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
import {EntitiesEngine} from '../../../modules/game/services/entities-engine.service';
import {AttackMeleeAction} from './attack-melee-action';
import {Entity} from '../base/entity';
import {GameEntities} from '../base/game-entities';

describe('attack-melee-action', () => {
  let player: Player = null;
  let gameMap: GameMap;
  let entitiesService: EntitiesEngine;
  let gameEngine: GameEngine;

  beforeEach(() => {
    TestBed.configureTestingModule({
                                     imports: [SharedModule,
                                               RouterTestingModule],
                                     providers: [EntitiesEngine, GameEngine]
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
  });

  it('should be created', () => {
    const attackAction: AttackMeleeAction = new AttackMeleeAction(player);
    expect(attackAction)
      .toBeTruthy();
  });

  it('should do a attack on entity', () => {
    player.onHit = function (damage: number) {
      player.hp = 0;
    };
    const attackAction: AttackMeleeAction = new AttackMeleeAction(player);
    const entity: Entity = gameMap.gameEntities.getEntities()[0];
    attackAction.execute(player, gameEngine);
    expect(player.hp)
      .toEqual(0);
  });
});
