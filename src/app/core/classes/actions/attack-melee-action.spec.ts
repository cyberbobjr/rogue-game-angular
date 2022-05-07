import {Player} from '../entities/player';
import {GameClassFactory} from '../../factories/game-class-factory';
import {ClassType} from '../../enums/class-type.enum';
import {RaceFactory} from '../../factories/race-factory';
import {RaceType} from '../../enums/race-type.enum';
import {GameMapImp} from '../base/game-map-imp';
import {MapBuilder} from '../../factories/map-builder';
import {GameEngineService} from '../../../services/game-engine-imp.service';
import {TestBed} from '@angular/core/testing';
import {SharedModule} from '../../../modules/shared/shared.module';
import {RouterTestingModule} from '@angular/router/testing';
import {EntitiesEngine} from '../../../services/entities-engine.service';
import {AttackMeleeAction} from './attack-melee-action';
import {Entity} from '../base/entity';
import {EntityBuilder} from '../../factories/entity-builder';

describe('attack-melee-action', () => {
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
        GameEngineService
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
    const attackAction: AttackMeleeAction = new AttackMeleeAction(player);
    expect(attackAction)
      .toBeTruthy();
  });

  it('should do a attack on entity', () => {
    player.onHit = function (damage: number) {
      player.hp = 0;
    };
    const attackAction: AttackMeleeAction = new AttackMeleeAction(player);
    const entity: Entity = entitiesService.getAllEntities()[0];
    attackAction.execute(entity, gameEngine);
    expect(player.hp)
      .toEqual(0);
  });
});
