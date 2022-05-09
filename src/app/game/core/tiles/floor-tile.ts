import {Tile} from '../base/tile';
import {SpritesFactory} from '../../factories/sprites-factory';
import {SpriteType} from '../../enums/sprite-type.enum';
import {Position2D} from '../base/position2D';
import {TileType} from '../../enums/tile-type.enum';
import {Entity} from '../base/entity';
import {Action} from '../../interfaces/action';
import {JSonCell} from '../../interfaces/json-interfaces';

export class FloorTile extends Tile {
  protected _type = TileType.FLOOR;
  protected _name = 'FloorTile';

  get type(): TileType {
    return this._type;
  }

  get name(): string {
    return this._name;
  }

  static fromJSON(json: JSonCell): FloorTile {
    return new this(new Position2D(json.position.x, json.position.y));
  }

  constructor(position: Position2D) {
    super();
    this._sprite = SpritesFactory.createSprite(SpriteType.FLOOR);
    this._opaque = false;
    this.position = position;
  }

  isWalkable(): boolean {
    return true;
  }

  onWalk(actor: Entity): Action | null {
    return super.onWalk(actor);
  }

  getInfo(): string {
    const info = 'floor';
    return info + super.getInfo();
  }

  onHit(actor: Entity): Action | null {
    return null;
  }

}
