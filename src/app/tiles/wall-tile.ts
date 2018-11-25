import {Tile} from '../classes/tile';
import {Sprite} from '../classes/sprite';

export class WallTile extends Tile {
  constructor() {
    super();
    this.sprite = new Sprite('#', 'red');
  }

  isWalkable(): boolean {
    return false;
  }
}
