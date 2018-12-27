import {Tile} from '../base/tile';
import {SpritesFactory} from '../../factories/sprites-factory';
import {SpriteType} from '../../enums/sprite-type.enum';
import {Position} from '../base/position';
import {TileType} from '../../enums/tile-type.enum';
import {Entity} from '../base/entity';
import {Iaction} from '../../interfaces/iaction';

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

  onWalk(actor: Entity): Iaction | null {
    return super.onWalk(actor);
  }

  getInfo(): string {
    const info = 'floor';
    return info + super.getInfo();
  }
}
