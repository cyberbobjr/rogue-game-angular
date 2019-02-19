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
import {AttackMeleeAction} from './attack-melee-action';
import {Entity} from '../base/entity';

describe('attack-melee-action', () => {
  let player: Player = null;
  let gameMap: GameMap;
  let entitiesService: EntitiesService;
  beforeEach(() => {
    TestBed.configureTestingModule({
                                     imports: [SharedModule,
                                               RouterTestingModule],
                                     providers: [EntitiesService, GameEngineService]
                                   });
    gameMap = new MapBuilder().withRandomEntities(5)
                              .build();
    entitiesService = TestBed.get(EntitiesService);
    entitiesService.entities = gameMap.entities;
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
    const gameEngine: GameEngineService = TestBed.get(GameEngineService);
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
