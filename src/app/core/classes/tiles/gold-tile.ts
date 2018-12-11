import {Tile} from '../base/tile';
import {SpritesFactory} from '../../factories/sprites-factory';
import {SpriteType} from '../../enums/sprite-type.enum';
import {TileType} from '../../enums/tile-type.enum';

export class GoldTile extends Tile {
  _type = TileType.GOLD;
  private _amount: number;

  get amount(): number {
    return this._amount;
  }

  set amount(value: number) {
    this._amount = value;
  }

  constructor(props) {
    super(props);
    this._name = 'Gold';
    this.sprite = SpritesFactory.createSprite(SpriteType.GOLD);
    this._opaque = false;
  }

  isWalkable(): boolean {
    return true;
  }

  getInfo(): string {
    return `${this._amount} gold pieces`;
  }
}

