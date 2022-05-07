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
import {Position} from '../base/position';
import {TakeAction} from './take-action';
import {Tile} from '../base/tile';
import {GameObjectFactory} from '../../factories/game-object-factory';
import {GameObjectType} from '../../enums/game-object-type.enum';
import {GameObject} from '../gameObjects/game-object';
import {GameEntities} from '../base/game-entities';
import {EntityBuilder} from '../../factories/entity-builder';

describe('take-action', () => {
  let player: Player = null;
  let gameMap: GameMapImp;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule,
        RouterTestingModule],
      providers: [EntitiesEngine, GameEngineService]
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
    expect(takeAction)
      .toBeTruthy();
  });

  it('should take objects from tile', () => {
    const gameObject: GameObject = GameObjectFactory.create(GameObjectType.WEAPON, 'club');
    const gameEngine: GameEngineService = TestBed.get(GameEngineService);
    const inventorySize: number = player.inventory.getInventorySize();
    const freePosition: Position = gameMap.getFreePositionForRoom(0);
    const tile: Tile = gameMap.getTileAt(freePosition);
    const takeAction: TakeAction = new TakeAction();

    tile.dropOn(gameObject);
    gameEngine.loadGame(gameMap, EntityBuilder.generateMonsters([], 1, gameMap));
    player.setMapLevelAndPosition(1, freePosition);
    takeAction.execute(player, gameEngine);
    const inventoryFinalSize: number = player.inventory.getInventorySize();
    expect(inventoryFinalSize)
      .toEqual(inventorySize + 1);
  });
});
