import {Tile} from '../base/tile';
import {Sprite} from '../base/sprite';

export class FloorTile extends Tile {
  constructor() {
    super();
    this.sprite = new Sprite('.', '#f7ff0f');
    this._opaque = false;
  }

  isWalkable(): boolean {
    return true;
  }

}
