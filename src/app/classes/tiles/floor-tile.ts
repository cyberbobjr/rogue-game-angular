import {Tile} from '../base/tile';
import {SpritesFactory} from '../../factories/sprites-factory';
import {SpriteType} from '../../enums/sprite-type.enum';

export class FloorTile extends Tile {
  constructor() {
    super();
    this.sprite = SpritesFactory.createSprite(SpriteType.FLOOR);
    this._opaque = false;
  }

  isWalkable(): boolean {
    return true;
  }

}
