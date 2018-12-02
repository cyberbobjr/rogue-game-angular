import {Tile} from '../base/tile';
import {SpritesFactory} from '../../factories/sprites-factory';
import {SpriteType} from '../../enums/sprite-type.enum';
import {Entity} from '../base/entity';
import {OpendoorAction} from '../actions/opendoor-action';
import {Iaction} from '../../interfaces/iaction';
import {Position} from '../position';
import {EventLog} from '../event-log';

export class DoorTile extends Tile {
  name = 'door';

  constructor(private _isClosed = true, position ?: Position) {
    super();
    this._opaque = this._isClosed;
    this._setSprite();
    this.position = position;
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
    this._writeStatut();
  }

  closeDoor() {
    this._isClosed = this._opaque = true;
    this._setSprite();
    this._writeStatut();
  }

  flipDoor() {
    this._isClosed = this._opaque = !this._isClosed;
    this._setSprite();
    this._writeStatut();
  }

  private _writeStatut() {
    EventLog.getInstance().message = 'The door is ' + (this._isClosed ? 'close' : 'open');
  }

  private _setSprite() {
    this.sprite = SpritesFactory.createSprite(this._isClosed ? SpriteType.CLOSEDOOR : SpriteType.OPENDOOR);
  }

}
