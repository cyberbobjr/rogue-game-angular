import {Entity} from './entity';
import {Position} from './position';
import {Sprite} from './sprite';
import {Iaction} from '../../interfaces/iaction';
import {IObject} from '../../interfaces/IObject';
import {TileType} from '../../enums/tile-type.enum';

export class Tile implements IObject {
  protected _type: TileType;
  protected _name: string;
  protected _sprite: Sprite;
  protected _opaque: boolean;

  get opaque(): boolean {
    return this._opaque;
  }

  set opaque(value: boolean) {
    this._opaque = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get position(): Position {
    return this._position;
  }

  set position(value: Position) {
    this._position = value;
  }

  get sprite(): Sprite {
    return this._sprite;
  }

  set sprite(value: Sprite) {
    this._sprite = value;
  }

  static fromJSON(json: any, position?: Position): Tile {
    return new this(position);
  }

  constructor(protected _position?: Position) {
  }

  isWalkable(): boolean {
    return false;
  }

  onWalk(actor: Entity): Iaction | null {
    return null;
  }

  onHit(actor: Entity): Iaction | null {
    return null;
  }
}
