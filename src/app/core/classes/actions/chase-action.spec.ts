import {ChaseAction} from './chase-action';
import {EntitiesFactory} from '../../factories/entities-factory';
import {Position} from '../base/position';
import {GameEngineImp} from '../../../modules/game/services/game-engine-imp.service';
import {TestBed} from '@angular/core/testing';
import {SharedModule} from '../../../modules/shared/shared.module';
import {RouterTestingModule} from '@angular/router/testing';
import {EntitiesEngine} from '../../../modules/game/services/entities-engine.service';
import {MapEngine} from '../../../modules/game/services/map-engine.service';
import {StorageEngine} from '../../../modules/game/services/storage-engine.service';
import {MapBuilder} from '../../factories/map-builder';
import {GameMap} from '../base/game-map';
import {Entity} from '../base/entity';
import {ActionResult} from './action-result';
import {IdleAction} from './idle-action';
import {FloorTile} from '../tiles/floor-tile';
import {AttackMeleeAction} from './attack-melee-action';
import {Player} from '../entities/player';

describe('Chase action', () => {
  let gameEngine: GameEngineImp;
  let entitiesService: EntitiesEngine;
  let gameMap: GameMap;

  beforeEach(() => {
    TestBed.configureTestingModule({
                                     imports: [SharedModule,
                                               RouterTestingModule],
                                     providers: [EntitiesEngine,
                                                 GameEngineImp,
                                                 MapEngine,
                                                 StorageEngine]
                                   });
    entitiesService = TestBed.get(EntitiesEngine);
    gameEngine = TestBed.get(GameEngineImp);
    gameMap = new MapBuilder().build();
    for (let y = 0; y < gameMap.height; y++) {
      for (let x = 0; x < gameMap.width; x++) {
        gameMap.setTile(new FloorTile(new Position(x, y)));
      }
    }
    gameEngine.loadGameMap(gameMap);
  });

  it('should be stop chasing if target not more visible', () => {
    const target: Entity = EntitiesFactory.generateRandomEntities(new Position(10, 10));
    const monster: Entity = EntitiesFactory.generateRandomEntities(new Position(5, 5));
    monster.sprite.light = false;
    monster.size = 'm';
    gameMap.gameEntities.setEntities([target, monster]);
    const chaseAction: ChaseAction = new ChaseAction(target);
    const result: ActionResult = chaseAction.execute(monster, gameEngine);
    expect(result)
      .toBe(ActionResult.SUCCESS);
    console.log('monster action : ' + monster.getAction()
                                             .getInfo());
    expect(monster.getAction() instanceof IdleAction)
      .toBeTruthy();
  });

  it('should chase if target spotted', () => {
    const target: Entity = EntitiesFactory.generateRandomEntities(new Position(7, 7));
    const monster: Entity = EntitiesFactory.generateRandomEntities(new Position(5, 5));
    const originalPosition: Position = monster.getPosition()
                                              .clone();
    monster.sprite.light = true;
    monster.size = 'm';
    gameMap.gameEntities.setEntities([target, monster]);

    const chaseAction: ChaseAction = new ChaseAction(target);
    const result: ActionResult = chaseAction.execute(monster, gameEngine);
    expect(result.succeeded)
      .toBeTruthy();
    expect(originalPosition.equal(monster.getPosition()))
      .toBeFalsy();
  });

  it('should attack if target next to actor', () => {
    const target: Player = new Player(new Position(5, 6));
    const monster: Entity = EntitiesFactory.generateRandomEntities(new Position(5, 5));
    monster.sprite.light = true;
    monster.size = 'm';
    gameMap.gameEntities.setEntities([target, monster]);

    const chaseAction: ChaseAction = new ChaseAction(target);
    const result: ActionResult = chaseAction.execute(monster, gameEngine);
    console.log(result);
    expect(result.alternative instanceof AttackMeleeAction)
      .toBeTruthy();
  });
});