import {Entity} from './entity';
import {Position} from './position';
import {Sprite} from './sprite';
import {Iaction} from '../../interfaces/iaction';
import {Iobject} from '../../interfaces/iobject';
import {TileType} from '../../enums/tile-type.enum';
import {GameObject} from '../gameObjects/game-object';
import {EventLog} from '../event-log';
import {Player} from '../entities/player';

export class Tile implements Iobject {
  protected _type: TileType;
  protected _name: string;
  protected _sprite: Sprite;
  protected _opaque: boolean;
  protected _contents: Array<GameObject> = [];

  get type(): TileType {
    return this._type;
  }

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
    if (this._contents.length > 0) {
      const object: GameObject = this._contents[0];
      return object.getSprite();
    }
    return this._sprite;
  }

  set sprite(value: Sprite) {
    this._sprite = value;
  }

  static fromJSON(json: any, position?: Position): Tile {
    return new this(position);
  }

  toJSON() {
    return {
      name: this._name,
      position: this._position,
      sprite: this._sprite,
      contents: this._contents,
      type: this._type,
      opaque: this._opaque
    };
  }

  constructor(protected _position?: Position) {
  }

  getInfo(): string {
    let info = '';
    this._contents.forEach((gameObject: GameObject) => {
      info += `, ${gameObject.getInfo()}`;
    });
    return info;
  }

  isWalkable(): boolean {
    return false;
  }

  onWalk(actor: Entity): Iaction | null {
    if (actor instanceof Player) {
      EventLog.getInstance().message = `You walk on ${this.getInfo()}`;
    }
    return null;
  }

  onHit(actor: Entity): Iaction | null {
    return null;
  }

  dropOn(gameObject: GameObject) {
    this._contents.push(gameObject);
  }

  onTake(actor: Entity) {
    this._contents.forEach((gameObject: GameObject) => {
      gameObject.onTake(actor);
    });
    this._contents.splice(0);
  }
}
