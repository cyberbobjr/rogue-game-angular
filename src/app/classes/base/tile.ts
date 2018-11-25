import {Entity} from './entity';
import {IEntity} from '../../interfaces/ientity';
import {Position} from '../position';
import {Sprite} from './sprite';

export class Tile implements IEntity {
  protected _name: string;
  protected _position: Position;
  protected _sprite: Sprite;

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

  constructor() {
  }

  isWalkable(): boolean {
    return false;
  }

  onWalk(actor: Entity): void {

  }

  onHit(actor: Entity): void {

  }
}
