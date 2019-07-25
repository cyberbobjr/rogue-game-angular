import {JsonSprite, JsonWeapon} from '../../interfaces/json-interfaces';
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

  static fromJson(_jsonWeapon: JsonWeapon): Weapon {
    const weapon: Weapon = new Weapon();
    for (const key of Object.keys(_jsonWeapon)) {
      weapon['_' + key] = _jsonWeapon[key];
    }
    if (_jsonWeapon.sprite) {
      weapon.sprite = new Sprite((_jsonWeapon.sprite as JsonSprite).character, (_jsonWeapon.sprite as JsonSprite).color);
    }
    return weapon;
  }

  toJSON(): JsonWeapon {
    return {
      ...super.toJSON(),
      damage: this._damage,
      thrown: this._thrown
    };
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
