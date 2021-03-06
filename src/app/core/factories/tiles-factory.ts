import {TileType} from '../enums/tile-type.enum';
import {Tile} from '../classes/base/tile';
import {WallTile} from '../classes/tiles/wall-tile';
import {FloorTile} from '../classes/tiles/floor-tile';
import {DoorTile} from '../classes/tiles/door-tile';
import {Position} from '../classes/base/position';
import {NextLevelTile} from '../classes/tiles/next-level-tile';
import {ChestTile} from '../classes/tiles/chest-tile';

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
        return new DoorTile(position, true);
      case TileType.STAIRUP:
        return new NextLevelTile(TileType.STAIRUP, position);
      case TileType.STAIRDOWN:
        return new NextLevelTile(TileType.STAIRDOWN, position);
      case TileType.CHEST:
        return new ChestTile(position);
      default:
        return null;
    }
  }

  static createJsonTile(type: TileType, jsonData: any): Tile | null {
    switch (type) {
      case TileType.WALL:
        return WallTile.fromJSON(jsonData);
      case TileType.FLOOR:
        return FloorTile.fromJSON(jsonData);
      case TileType.DOOR:
        return DoorTile.fromJSON(jsonData);
      case TileType.STAIRUP:
      case TileType.STAIRDOWN:
        return NextLevelTile.fromJSON(jsonData);
      case TileType.CHEST:
        return ChestTile.fromJSON(jsonData);
      default:
        return null;
    }
  }
}
