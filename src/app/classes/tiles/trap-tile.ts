import {Tile} from '../base/tile';
import {Sprite} from '../base/sprite';

export class TrapTile extends Tile {
  name = 'trap';

  constructor() {
    super();
    this.sprite = new Sprite('.');
    this._opaque = false;
  }
}
