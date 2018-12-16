import {Tile} from '../base/tile';
import {SpritesFactory} from '../../factories/sprites-factory';
import {SpriteType} from '../../enums/sprite-type.enum';
import {Position} from '../base/position';
import {TileType} from '../../enums/tile-type.enum';
import {Entity} from '../base/entity';
import {GameObject} from '../base/game-object';
import {Iaction} from '../../interfaces/iaction';
import {EventLog} from '../event-log';

export class FloorTile extends Tile {
  protected _type = TileType.FLOOR;
  protected _name = 'FloorTile';

  get type(): TileType {
    return this._type;
  }

  get name(): string {
    return this._name;
  }

  constructor(position: Position) {
    super();
    this._sprite = SpritesFactory.createSprite(SpriteType.FLOOR);
    this._opaque = false;
    this.position = position;
  }

  isWalkable(): boolean {
    return true;
  }

  onTake(actor: Entity) {
    this._contents.forEach((gameObject: GameObject, index: number) => {
      gameObject.onTake(actor);
      this._contents.splice(index, 1);
    });
  }

  onWalk(actor: Entity): Iaction | null {
    EventLog.getInstance().message = 'You walk on ' + this.getInfo();
    return null;
  }

  getInfo(): string {
    if (this._contents.length > 0) {
      return this._contents[0].getInfo();
    }
    return 'floor tile';
  }
}
