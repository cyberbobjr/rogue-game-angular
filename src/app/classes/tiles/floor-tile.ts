import {Tile} from '../base/tile';
import {Sprite} from '../base/sprite';

export class FloorTile extends Tile {
  constructor() {
    super();
    this.sprite = new Sprite('.', 'grey');
    this._opaque = false;
  }

  isWalkable(): boolean {
    return true;
  }

}
