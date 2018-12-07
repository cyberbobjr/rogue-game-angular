import {Tile} from '../base/tile';
import {SpriteType} from '../../enums/sprite-type.enum';
import {SpritesFactory} from '../../factories/sprites-factory';
import {Position} from '../base/position';
import {TileType} from '../../enums/tile-type.enum';

export class WallTile extends Tile {
  _type = TileType.WALL;
  name = 'wall';

  constructor(position?: Position) {
    super();
    this.sprite = SpritesFactory.createSprite(SpriteType.WALL);
    this._opaque = true;
    this.position = position;
  }

  isWalkable(): boolean {
    return false;
  }
}
