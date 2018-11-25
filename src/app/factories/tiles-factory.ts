import {TileType} from '../enums/tile-type.enum';
import {Tile} from '../classes/tile';
import {WallTile} from '../tiles/wall-tile';
import {FloorTile} from '../tiles/floor-tile';

export class TilesFactory {
  constructor() {
  }

  static createTile(type: TileType): Tile | null {
    switch (type) {
      case TileType.WALL:
        return new WallTile();
      case TileType.FLOOR:
        return new FloorTile();
      default:
        return null;
    }
  }
}
