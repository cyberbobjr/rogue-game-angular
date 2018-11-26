import {Tile} from '../base/tile';
import {SpriteType} from '../../enums/sprite-type.enum';
import {SpritesFactory} from '../../factories/sprites-factory';

export class WallTile extends Tile {
  constructor() {
    super();
    this.sprite = SpritesFactory.createSprite(SpriteType.WALL);
    this._opaque = true;
  }

  isWalkable(): boolean {
    return false;
  }
}
