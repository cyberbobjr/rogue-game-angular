import {Sprite} from './sprite';
import {JsonWeapon} from '../../interfaces/json-interfaces';
import {GameObject} from './game-object';
import {Entity} from './entity';

export class Weapon extends GameObject {
  private _id: string;
  private _name: string;
  sprite: Sprite;
  objectType = 'WEAPON';

  get id(): string {
    return this._jsonData.id;
  }

  get name(): string {
    return this._jsonData.name;
  }

  static fromJson(_jsonData: JsonWeapon): Weapon {
    return new this(_jsonData);
  }

  constructor(private _jsonData: JsonWeapon) {
    super();
    this._id = _jsonData.id;
    this._name = _jsonData.name;
    this.sprite = new Sprite(_jsonData.sprite._character, _jsonData.sprite._color);
  }

  getInfo(): string {
    return `${this._name}`;
  }

  onTake(actor: Entity): void {
    actor.addToInventory(this);
  }
}
