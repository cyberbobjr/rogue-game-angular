import {FloorTile} from './floor-tile';
import {Position} from '../base/position';
import {SpritesFactory} from '../../factories/sprites-factory';
import {SpriteType} from '../../enums/sprite-type.enum';
import {TileType} from '../../enums/tile-type.enum';
import {Entity} from '../base/entity';
import {EventLog} from '../event-log';
import {GameObjectFactory} from '../../factories/game-object-factory';
import {GameObject} from '../gameObjects/game-object';
import {Utility} from '../utility';
import {Iaction} from '../../interfaces/iaction';

export class ChestTile extends FloorTile {
  protected _type = TileType.CHEST;
  protected _name = 'ChestTile';

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
    return true;
  }

  private _setSprite() {
    this.sprite = SpritesFactory.createSprite(this._isClosed ? SpriteType.CHESTCLOSED : SpriteType.CHESTOPENED);
  }

  getInfo(): string {
    if (this._isClosed) {
      return 'closed chest';
    }
    if (this._contents.length === 0) {
      return 'an empty chest';
    }
    return 'opened chest with ' + this._getContentInfo();
  }

  openChest() {
    const gameObjectFactory = new GameObjectFactory();
    const chestObjects: Array<GameObject> = gameObjectFactory.generateRandomObjects(Utility.rolldice(5));
    chestObjects.forEach((gameObject: GameObject) => {
      this.dropOn(gameObject);
    });
    try {
      EventLog.getInstance().message = 'You open the chest with ' + this._getContentInfo();
      this._isClosed = false;
    } catch (e) {
      console.log(e);
      console.log(chestObjects);
    }
  }


  onTake(actor: Entity): void {
    if (this._isClosed) {
      EventLog.getInstance().message = 'The chest is closed';
    } else {
      EventLog.getInstance().message = 'You take everything from chest';
      super.onTake(actor);
    }
  }

  onHit(actor: Entity): Iaction | null {
    return null;
  }
}
