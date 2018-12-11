import {Tile} from '../base/tile';
import {SpritesFactory} from '../../factories/sprites-factory';
import {SpriteType} from '../../enums/sprite-type.enum';
import {TileType} from '../../enums/tile-type.enum';
import {Entity} from '../base/entity';
import {Iaction} from '../../interfaces/iaction';
import {EventLog} from '../event-log';
import {Position} from '../base/position';

export class GoldTile extends Tile {
  protected _type = TileType.GOLD;
  protected _amount: number;

  static fromJSON(json: any, position?: Position): Tile {
    const {_amount} = json;
    const tile: GoldTile = new this(position);
    tile.amount = _amount;
    return tile;
  }

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
    return `${this._amount} gold pieces on floor`;
  }

  onWalk(actor: Entity): Iaction | null {
    EventLog.getInstance().message = this.getInfo();
    return null;
  }
}

