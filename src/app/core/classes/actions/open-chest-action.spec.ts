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
import {ActionResult} from './action-result';
import {EntitiesEngine} from '../../../services/entities-engine.service';
import {Position} from '../base/position';
import {OpenChestAction} from './open-chest-action';
import {ChestTile} from '../tiles/chest-tile';
import {EntityBuilder} from '../../factories/entity-builder';

describe('open-chest-action', () => {
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
    const openChestAction: OpenChestAction = new OpenChestAction();
    expect(openChestAction)
      .toBeTruthy();
  });

  it('should open chest', () => {
    const chestsPosition: Array<Position> = gameMap.getAllPosition<ChestTile>(ChestTile);
    const gameEngine: GameEngineService = TestBed.get(GameEngineService);
    player.setMapLevelAndPosition(gameMap.level, chestsPosition[0]);
    gameEngine.loadGame(gameMap, EntityBuilder.generateMonsters([], 1, gameMap), player);
    const openChestAction: OpenChestAction = new OpenChestAction();
    const resultAction: ActionResult = openChestAction.execute(player, gameEngine);
    expect(resultAction.succeeded)
      .toBeTruthy();
    const tileChest: ChestTile = gameMap.getTileAt(player.position) as ChestTile;
    expect(tileChest.isClosed)
      .toBeFalsy();
  });
});
