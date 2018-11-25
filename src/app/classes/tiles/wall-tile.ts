import {Tile} from '../base/tile';
import {Sprite} from '../base/sprite';

export class WallTile extends Tile {
  constructor() {
    super();
    this.sprite = new Sprite('#', 'red');
  }

  isWalkable(): boolean {
    return false;
  }
}
