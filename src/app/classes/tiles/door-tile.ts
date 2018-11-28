import {Tile} from '../base/tile';
import {SpritesFactory} from '../../factories/sprites-factory';
import {SpriteType} from '../../enums/sprite-type.enum';
import {Entity} from '../base/entity';
import {OpendoorAction} from '../actions/opendoor-action';
import {Iaction} from '../../interfaces/iaction';

export class DoorTile extends Tile {

  constructor(private _isClosed = true) {
    super();
    this._opaque = this._isClosed;
    this._setSprite();
  }

  isWalkable(): boolean {
    return !this._isClosed;
  }

  onWalk(actor: Entity): Iaction | null {
    return null;
  }

  onHit(actor: Entity): Iaction | null {
    if (this._isClosed) {
      return new OpendoorAction(this);
    }
    return null;
  }

  openDoor() {
    this._isClosed = this._opaque = false;
    this._setSprite();
  }

  closeDoor() {
    this._isClosed = this._opaque = true;
    this._setSprite();
  }

  private _setSprite() {
    this.sprite = SpritesFactory.createSprite(this._isClosed ? SpriteType.CLOSEDOOR : SpriteType.OPENDOOR);
  }

}
