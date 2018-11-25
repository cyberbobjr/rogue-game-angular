import {Tile} from '../classes/tile';

export class PlayerTile extends Tile {
  constructor() {
    super();
    this.character = '@';
    this.color = 'white';
  }
}
