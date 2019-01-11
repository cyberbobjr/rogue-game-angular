import {Tile} from '../base/tile';
import {Sprite} from '../base/sprite';
import {TileType} from '../../enums/tile-type.enum';

export class TrapTile extends Tile {
  _type = TileType.TRAP;
  name = 'TrapTile';

  constructor() {
    super();
    this.sprite = new Sprite('.');
    this._opaque = false;
  }

  isWalkable(): boolean {
    return true;
  }
}
