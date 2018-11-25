import {Tile} from '../classes/tile';

export class FloorTile extends Tile {
  constructor() {
    super();
    this.character = '.';
  }

  isWalkable(): boolean {
    return true;
  }

}
