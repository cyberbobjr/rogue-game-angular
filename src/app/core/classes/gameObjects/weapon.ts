import {JsonWeapon} from '../../interfaces/json-interfaces';
import {GameObject} from './game-object';
import {SlotType} from '../../enums/equiped-type.enum';
import {Utility} from '../utility';
import {Entity} from '../base/entity';
import {Sprite} from '../base/sprite';

export class Weapon extends GameObject implements JsonWeapon {
  private _damage: {
    type: string,
    dice: number,
    mul: number
  };
  private _thrown?: {
    normal: number;
    long: number;
  };

  get damage(): { type: string; dice: number; mul: number } {
    return this._damage;
  }

  set damage(value: { type: string; dice: number; mul: number }) {
    this._damage = value;
  }

  get thrown(): { normal: number; long: number } {
    return this._thrown;
  }

  set thrown(value: { normal: number; long: number }) {
    this._thrown = value;
  }

  static fromJson(_jsonData: JsonWeapon): Weapon {
    let weapon: Weapon = Object.setPrototypeOf(_jsonData, this.prototype);
    weapon = Object.assign(weapon, _jsonData);
    if (_jsonData.sprite) {
      weapon.sprite = new Sprite(_jsonData.sprite.character, _jsonData.sprite.color);
    }
    return weapon;
  }

  constructor() {
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
    if (this._damage) {
      return (this._damage.mul * Utility.rolldice(this._damage.dice));
    }
    return 0;
  }
}
