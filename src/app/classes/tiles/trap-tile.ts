import {Tile} from '../base/tile';
import {Sprite} from '../base/sprite';

export class TrapTile extends Tile {
  constructor() {
    super();
    this.sprite = new Sprite('.');
  }
}
