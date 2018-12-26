import {Sprite} from '../base/sprite';
import {JsonWeapon} from '../../interfaces/json-interfaces';
import {GameObject} from './game-object';
import {Entity} from '../base/entity';
import {SlotType} from '../../enums/equiped-type.enum';

export class Potion extends GameObject {
  private _id: string;
  private _name: string;
  sprite: Sprite;
  objectType = 'POTION';

  get id(): string {
    return this._jsonData.id;
  }

  get name(): string {
    return this._jsonData.name;
  }

  get properties(): Array<string> {
    return this._jsonData.properties;
  }

  static fromJson(_jsonData: JsonWeapon): Potion {
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

  getSlots(): Array<SlotType> {
    return [];
  }
}
