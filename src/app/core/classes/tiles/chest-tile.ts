import {FloorTile} from './floor-tile';
import {Position} from '../base/position';
import {SpritesFactory} from '../../factories/sprites-factory';
import {SpriteType} from '../../enums/sprite-type.enum';

export class ChestTile extends FloorTile {

  get isClosed(): boolean {
    return this._isClosed;
  }

  static fromJSON(json: any): ChestTile {
    const {_isClosed} = json;
    return new this(new Position(json.position._x, json.position._y), _isClosed);
  }

  constructor(position: Position, private _isClosed = true) {
    super(position);
    this._setSprite();
  }

  toJSON(): any {
    return {
      ...super.toJSON(),
      ...{
        _isClosed: this._isClosed
      }
    };
  }

  isWalkable(): boolean {
    return false;
  }

  private _setSprite() {
    this.sprite = SpritesFactory.createSprite(this._isClosed ? SpriteType.CHESTCLOSED : SpriteType.CHESTOPENED);
  }

}
