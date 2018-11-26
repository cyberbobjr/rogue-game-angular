import {Sprite} from '../base/sprite';
import {Tile} from '../base/tile';

export class DoorTile extends Tile {
  constructor() {
    super();
    this.sprite = new Sprite('D', '#aeaeae');
    this._opaque = true;
  }

  isWalkable(): boolean {
    return true;
  }
}
