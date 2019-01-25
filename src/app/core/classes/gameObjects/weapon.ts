import {JsonWeapon} from '../../interfaces/json-interfaces';
import {GameObject} from './game-object';
import {SlotType} from '../../enums/equiped-type.enum';
import {Utility} from '../utility';
import {Entity} from '../base/entity';

export class Weapon extends GameObject {
  protected _damage: {
    type: string,
    dice: number,
    mul: number
  };
  protected _thrown?: {
    normal: number;
    long: number;
  };

  get name(): string {
    return this._name;
  }

  get properties(): Array<string> {
    return this._jsonData.properties;
  }

  static fromJson(_jsonData: JsonWeapon): Weapon {
    const weapon: Weapon = new this();
    weapon._damage = _jsonData.damage;
    weapon._thrown = _jsonData.thrown;
    return weapon;
  }

  constructor(data?: any) {
    super();
    this.objectType = 'WEAPON';
  }

  canEquip(): boolean {
    return true;
  }

  onUnequip(actor: Entity, letterInventory?: string) {
    actor.unequipItem(letterInventory);
  }

  onEquip(actor: Entity, letterInventory?: string) {
    actor.equipInventory(letterInventory);
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
