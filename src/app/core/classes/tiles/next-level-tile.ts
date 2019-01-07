import {Tile} from '../base/tile';
import {Sprite} from '../base/sprite';
import {TileType} from '../../enums/tile-type.enum';
import {Position} from '../base/position';

export class NextLevelTile extends Tile {
  name = 'Stair';

  static fromJSON(json: any): NextLevelTile {
    const {_type} = json.type;
    return new this(_type, new Position(json.position._x, json.position._y));
  }

  constructor(gotoLevel: TileType, position?: Position) {
    super(position);
    this._type = gotoLevel;
    this.sprite = new Sprite(gotoLevel === TileType.STAIRUP ? '>' : '<');
    this._opaque = false;
  }

  isWalkable(): boolean {
    return true;
  }

}
