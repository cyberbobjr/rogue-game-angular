import {Tile} from '../classes/tile';
import {Sprite} from '../classes/sprite';

export class FloorTile extends Tile {
  constructor() {
    super();
    this.sprite = new Sprite('.', 'gray');
  }

  isWalkable(): boolean {
    return true;
  }

}
