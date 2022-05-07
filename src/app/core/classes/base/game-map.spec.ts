import {GameMapImp} from './game-map-imp';
import {ChestTile} from '../tiles/chest-tile';
import {Position} from './position';
import {TilesFactory} from '../../factories/tiles-factory';
import {TileType} from '../../enums/tile-type.enum';
import {Tile} from './tile';

describe('Game map', () => {

  it('will be created', () => {
    const gameMap: GameMapImp = new GameMapImp(10, 10);
    expect(gameMap.width)
      .toEqual(10);
    expect(gameMap.height)
      .toEqual(10);
  });

  it('will check for generic Tile', () => {
    const chestPosition: Position = new Position(5, 5);
    const gameMap: GameMapImp = new GameMapImp(10, 10);
    const chestTile: ChestTile = new ChestTile(chestPosition);
    gameMap.setTile(chestTile);
    const testingArray: Array<Position> = gameMap.getAllPosition<ChestTile>(ChestTile);
    expect(testingArray.length)
      .toEqual(1);
    expect(testingArray[0].equal(chestPosition))
      .toBeTruthy();
  });

  it('should set tile', () => {
    const chestPosition: Position = new Position(5, 5);
    const gameMap: GameMapImp = new GameMapImp(10, 10);
    const chestTile: ChestTile = new ChestTile(chestPosition);

    gameMap.setTile(chestTile);
    expect(gameMap.getTileAt(chestPosition))
      .toEqual(chestTile);
  });

  it('should extract tile from map', () => {
    const gameMap: GameMapImp = new GameMapImp(10, 10);
    const tile: Tile = TilesFactory.createTile(TileType.FLOOR, new Position(5, 5));
    gameMap.setTile(tile);
    const tilesExtracted: Tile[][] = gameMap.extractTiles(5, 5, 1, 1);
    const tileExtracted: Tile = tilesExtracted[0][0];
    expect(tilesExtracted.length)
      .toEqual(1);
    expect(tileExtracted.name)
      .toEqual(tile.name);
  });
});
