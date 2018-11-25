import {Tile} from '../classes/tile';
import {Sprite} from '../classes/sprite';

export class TrapTile extends Tile {
  constructor() {
    super();
    this.sprite = new Sprite('.');
  }
}
