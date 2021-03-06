import {Entity} from './entity';
import {Position} from './position';
import {Sprite} from './sprite';
import {Iaction} from '../../interfaces/iaction';
import {Iobject} from '../../interfaces/iobject';
import {TileType} from '../../enums/tile-type.enum';
import {GameObject} from '../gameObjects/game-object';
import {EventLog} from '../event-log';
import {Player} from '../entities/player';

export abstract class Tile implements Iobject {
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

  protected constructor(protected _position?: Position) {
  }

  abstract isWalkable(): boolean ;

  getInfo(): string {
    if (this._contents.length > 0) {
      return `, you see :  + ${this._getContentInfo()}`;
    }
    return '';
  }

  onWalk(actor: Entity): Iaction | null {
    if (actor instanceof Player) {
      EventLog.getInstance().message = `You walk on ${this.getInfo()} `;
    }
    return null;
  }

  abstract onHit(actor: Entity): Iaction | null;

  dropOn(gameObject: GameObject) {
    try {
      const existingGameObject = this._contents.find((value: GameObject) => value.id === gameObject.id);
      if (existingGameObject && existingGameObject.empilable) {
        existingGameObject.qty += gameObject.qty;
      } else {
        this._contents.push(gameObject);
      }
    } catch (e) {
      console.log(gameObject);
      console.log(this._contents);
      console.log(e);
    }
  }

  onTake(actor: Entity) {
    this._contents.forEach((gameObject: GameObject) => {
      gameObject.onTake(actor);
    });
    this._contents.splice(0);
  }

  protected _getContentInfo() {
    const info: Array<string> = [];
    this._contents.forEach((gameObject: GameObject) => {
      let text = `${gameObject.getInfo()}`;
      text += (gameObject.empilable && gameObject.qty > 1) ? `[${gameObject.qty}]` : ``;
      info.push(text);
    });
    return info.join(', ');
  }
}
