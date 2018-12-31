import {Sprite} from '../base/sprite';
import {JsonWeapon} from '../../interfaces/json-interfaces';
import {GameObject} from './game-object';
import {SlotType} from '../../enums/equiped-type.enum';
import {Utility} from '../utility';
import {Entity} from '../base/entity';

export class Weapon extends GameObject {
  protected _sprite: Sprite;
  objectType = 'WEAPON';
  empilable = false;

  get id(): string {
    return this._jsonData.id;
  }

  get name(): string {
    return this._jsonData.name;
  }

  get properties(): Array<string> {
    return this._jsonData.properties;
  }

  static fromJson(_jsonData: JsonWeapon): Weapon {
    return new this(_jsonData);
  }

  constructor(_jsonData: JsonWeapon) {
    super(_jsonData);
  }

  canEquip(): boolean {
    return true;
  }

  onUnequip(actor: Entity, letterInventory?: string) {
    actor.unequipItem(letterInventory);
  }

  onEquip(actor: Entity, letterInventory?: string) {
    actor.equipItem(letterInventory);
  }

  getInfo(): string {
    return `${this._name}`;
  }

  getSlots(): Array<SlotType> {
    return [SlotType.RIGHTHAND, SlotType.LEFTHAND];
  }

  getDamage(): number {
    if (<JsonWeapon>this._jsonData.damage) {
      return (this._jsonData.damage.mul * Utility.rolldice(this._jsonData.damage.dice));
    }
    return 0;
  }
}
