import {Tile} from '../base/tile';
import {Sprite} from '../base/sprite';
import {TileType} from '../../enums/tile-type.enum';

export class NextLevelTile extends Tile {
  name = 'Stair';

  constructor(gotoLevel: TileType) {
    super();
    this._type = gotoLevel;
    this.sprite = new Sprite(gotoLevel === TileType.STAIRUP ? '>' : '<');
    this._opaque = false;
  }

  isWalkable(): boolean {
    return true;
  }

}
