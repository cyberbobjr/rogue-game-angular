import {TileType} from '../enums/tile-type.enum';
import {Tile} from '../classes/tile';

export class TilesFactory {
  constructor() {
  }

  createTile(type: TileType): Tile | null {
    switch (type) {
      case TileType.PLAYER:
        return new Tile('@');
      case TileType.WALL:
        return new Tile('#');
      case TileType.FLOOR:
        return new Tile('.');
      default:
        return null;
    }
  }
}
