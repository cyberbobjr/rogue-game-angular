import {GameMap} from './game-map';
import {ChestTile} from '../tiles/chest-tile';
import {Position} from './position';

describe('Game map testing', () => {

  it('will be created', () => {
    const gameMap: GameMap = new GameMap(10, 10);
    expect(gameMap.width)
      .toEqual(10);
    expect(gameMap.height)
      .toEqual(10);
  });

  it('will check for generic Tile', () => {
    const chestPosition: Position = new Position(5, 5);
    const gameMap: GameMap = new GameMap(10, 10);
    const chestTile: ChestTile = new ChestTile(chestPosition);
    gameMap.setTile(chestTile);
    const testingArray: Array<Position> = gameMap.getAllPosition<ChestTile>(ChestTile);
    expect(testingArray.length)
      .toEqual(1);
    expect(testingArray[0].equal(chestPosition)).toBeTruthy();
  });
});
