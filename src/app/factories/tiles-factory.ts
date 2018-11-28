import {TileType} from '../enums/tile-type.enum';
import {Tile} from '../classes/base/tile';
import {WallTile} from '../classes/tiles/wall-tile';
import {FloorTile} from '../classes/tiles/floor-tile';
import {DoorTile} from '../classes/tiles/door-tile';
import {Position} from '../classes/position';

export class TilesFactory {
  constructor() {
  }

  static createTile(type: TileType, position ?: Position): Tile | null {
    switch (type) {
      case TileType.WALL:
        return new WallTile(position);
      case TileType.FLOOR:
        return new FloorTile(position);
      case TileType.DOOR:
        return new DoorTile(true, position);
      default:
        return null;
    }
  }
}
