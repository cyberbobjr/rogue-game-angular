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
import {ActionResult} from './action-result';
import {EntitiesManager} from '../../../modules/game/services/entities-manager.service';
import {Position} from '../base/position';
import {OpenChestAction} from './open-chest-action';
import {ChestTile} from '../tiles/chest-tile';

describe('open-chest-action', () => {
  let player: Player = null;
  let gameMap: GameMap;

  beforeEach(() => {
    TestBed.configureTestingModule({
                                     imports: [SharedModule,
                                               RouterTestingModule],
                                     providers: [EntitiesManager, GameEngine]
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
    const openChestAction: OpenChestAction = new OpenChestAction(player);
    expect(openChestAction)
      .toBeTruthy();
  });

  it('should open chest', () => {
    const openChestAction: OpenChestAction = new OpenChestAction(player);
    const chestsPosition: Array<Position> = gameMap.getAllChestsPosition();
    const gameEngine: GameEngine = TestBed.get(GameEngine);
    gameEngine.loadGameMap(gameMap, []);
    player.setMapLevelAndPosition(gameMap.level, chestsPosition[0]);
    const resultAction: ActionResult = openChestAction.execute(player, gameEngine);
    expect(resultAction.succeeded)
      .toBeTruthy();
    const tileChest: ChestTile = gameMap.getTileAt(player.position) as ChestTile;
    expect(tileChest.isClosed)
      .toBeFalsy();
  });
});
