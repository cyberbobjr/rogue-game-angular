import {Tile} from '../classes/tile';

export class WallTile extends Tile {
  constructor() {
    super();
    this.character = '#';
    this.color = 'red';
  }

  isWalkable(): boolean {
    return false;
  }
}
