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
import {Position} from '../base/position';
import {TakeAction} from './take-action';
import {Tile} from '../base/tile';
import {GameObjectFactory} from '../../factories/game-object-factory';
import {GameObjectType} from '../../enums/game-object-type.enum';
import {GameObject} from '../gameObjects/game-object';
import {GameEntities} from '../base/game-entities';

describe('take-action', () => {
  let player: Player = null;
  let gameMap: GameMap;

  beforeEach(() => {
    TestBed.configureTestingModule({
                                     imports: [SharedModule,
                                               RouterTestingModule],
                                     providers: [EntitiesEngine, GameEngine]
                                   });
    gameMap = new MapBuilder().withRandomChests(5)
                              .build();
    player = new Player().setGameClass(GameClassFactory.getInstance()
                                                       .createGameClass(ClassType.BARBARIAN))
                         .setRace(RaceFactory.getInstance()
                                             .createRace(RaceType.HUMAN))
                         .setMapLevelAndPosition(gameMap.level, gameMap.entryPosition);
  });

  it('should be created', () => {
    const takeAction: TakeAction = new TakeAction();
    takeAction.subject = player;
    expect(takeAction)
      .toBeTruthy();
  });

  it('should take objects from tile', () => {
    const inventorySize: number = player.inventory.getInventorySize();
    const freePosition: Position = gameMap.getFreeSlotForRoom(0);
    const tile: Tile = gameMap.getTileAt(freePosition);
    const gameObject: GameObject = GameObjectFactory.create(GameObjectType.WEAPON, 'club');
    tile.dropOn(gameObject);
    const gameEngine: GameEngine = TestBed.get(GameEngine);
    gameEngine.loadGameMap(gameMap);
    player.setMapLevelAndPosition(1, freePosition);
    const takeAction: TakeAction = new TakeAction();
    takeAction.execute(player, gameEngine);
    const inventoryFinalSize: number = player.inventory.getInventorySize();
    expect(inventorySize + 1)
      .toEqual(inventoryFinalSize);
  });
});
