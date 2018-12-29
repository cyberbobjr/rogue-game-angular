import {Sprite} from '../base/sprite';
import {JsonArmor} from '../../interfaces/json-interfaces';
import {GameObject} from './game-object';
import {Entity} from '../base/entity';
import {SlotType} from '../../enums/equiped-type.enum';

export class Armor extends GameObject {
  protected _sprite: Sprite;
  objectType = 'ARMOUR';

  get ac() : number {
    return this._jsonData.ac;
  }

  get id(): string {
    return this._jsonData.id;
  }

  get name(): string {
    return this._jsonData.name;
  }

  get properties(): Array<string> {
    return this._jsonData.properties;
  }

  static fromJson(_jsonData: JsonArmor): Armor {
    return new this(_jsonData);
  }

  constructor(_jsonData: JsonArmor) {
    super(_jsonData);
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
