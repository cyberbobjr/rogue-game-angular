import {Tile} from '../base/tile';
import {SpriteType} from '../../enums/sprite-type.enum';
import {SpritesFactory} from '../../factories/sprites-factory';
import {Position} from '../position';

export class WallTile extends Tile {
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
