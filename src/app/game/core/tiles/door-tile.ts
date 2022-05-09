import {Tile} from '../base/tile';
import {SpritesFactory} from '../../factories/sprites-factory';
import {SpriteType} from '../../enums/sprite-type.enum';
import {Entity} from '../base/entity';
import {Action} from '../../interfaces/action';
import {Position2D} from '../base/position2D';
import {EventLog} from '../Utility/event-log';
import {TileType} from '../../enums/tile-type.enum';

export class DoorTile extends Tile {
  protected _type = TileType.DOOR;
  protected _name = 'DoorTile';

  static fromJSON(json: any): DoorTile {
    const {_isClosed} = json;
    return new this(new Position2D(json.position._x, json.position._y), _isClosed);
  }

  get isClosed(): boolean {
    return this._isClosed;
  }

  constructor(position?: Position2D, private _isClosed = true) {
    super();
    this._opaque = this._isClosed;
    this._setSprite();
    if (position) {
      this.position = position;
    }
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
    return !this._isClosed;
  }

  onWalk(actor: Entity): Action | null {
    EventLog.getInstance().message = 'You walk on ' + this.getInfo();
    return null;
  }

  onHit(actor: Entity): Action | null {
    if (this._isClosed) {
      this.openDoor();
    }
    return null;
  }

  getInfo(): string {
    const info = 'door';
    return info + super.getInfo();
  }

  openDoor() {
    this._isClosed = this._opaque = false;
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
    this.sprite = SpritesFactory.createSprite(this._isClosed ? SpriteType.DOORCLOSED : SpriteType.DOOROPENED);
  }
}
