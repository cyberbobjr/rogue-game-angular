import {Tile} from '../base/tile';
import {SpritesFactory} from '../../factories/sprites-factory';
import {SpriteType} from '../../enums/sprite-type.enum';
import {Entity} from '../base/entity';
import {Iaction} from '../../interfaces/iaction';
import {Position} from '../base/position';
import {EventLog} from '../event-log';
import {TileType} from '../../enums/tile-type.enum';

export class DoorTile extends Tile {
  _type = TileType.DOOR;
  name = 'DoorTile';

  static fromJSON(json: any, position?: Position): DoorTile {
    const {_isClosed} = json;
    return new this(position, _isClosed);
  }

  constructor(position?: Position, private _isClosed = true) {
    super();
    this._opaque = this._isClosed;
    this._setSprite();
    if (position) {
      this.position = position;
    }
  }

  isWalkable(): boolean {
    return !this._isClosed;
  }

  onWalk(actor: Entity): Iaction | null {
    return null;
  }

  onHit(actor: Entity): Iaction | null {
    if (this._isClosed) {
      this.openDoor();
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
