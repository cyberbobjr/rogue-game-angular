import {TileType} from '../enums/tile-type.enum';
import {Tile} from '../classes/tile';
import {WallTile} from '../tiles/wall-tile';
import {FloorTile} from '../tiles/floor-tile';
import {PlayerTile} from '../tiles/player-tile';

export class TilesFactory {
  constructor() {
  }

  createTile(type: TileType): Tile | null {
    switch (type) {
      case TileType.PLAYER:
        return new PlayerTile();
      case TileType.WALL:
        return new WallTile();
      case TileType.FLOOR:
        return new FloorTile();
      default:
        return null;
    }
  }
}
