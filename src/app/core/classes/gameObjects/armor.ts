import {Sprite} from '../base/sprite';
import {JsonArmor} from '../../interfaces/json-interfaces';
import {GameObject} from './game-object';
import {SlotType} from '../../enums/equiped-type.enum';
import {Entity} from 'src/app/core/classes/base/entity';

export class Armor extends GameObject {
  protected _sprite: Sprite;
  objectType = 'ARMOUR';
  empilable = false;

  get ac(): number {
    return +this._jsonData.ac;
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

  onEquip(actor: Entity, letterInventory?: string) {
    actor.equipItem(letterInventory);
  }

  onUnequip(actor: Entity, letterInventory?: string) {
    actor.unequipItem(letterInventory);
  }

  canEquip(): boolean {
    return true;
  }

  getInfo(): string {
    return `${this._name}`;
  }

  getSlots(): Array<SlotType> {
    if (this.id === 'shield') {
      return [SlotType.LEFTHAND,
              SlotType.RIGHTHAND];
    }

    return [SlotType.CHEST,
            SlotType.LEGS,
            SlotType.HEAD,
            SlotType.BOOTS];
  }
}
