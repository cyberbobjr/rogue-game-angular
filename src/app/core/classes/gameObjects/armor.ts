import {JsonArmor} from '../../interfaces/json-interfaces';
import {GameObject} from './game-object';
import {SlotType} from '../../enums/equiped-type.enum';
import {Entity} from 'src/app/core/classes/base/entity';
import {Sprite} from '../base/sprite';

export class Armor extends GameObject implements JsonArmor {
  private _ac: number;

  set ac(value: number) {
    this._ac = value;
  }

  get ac(): number {
    return this._ac;
  }

  static fromJson(_jsonData: JsonArmor): Armor {
    let armor: Armor = Object.setPrototypeOf(_jsonData, this.prototype);
    armor = Object.assign(armor, _jsonData);
    if (_jsonData.sprite) {
      armor.sprite = new Sprite(_jsonData.sprite.character, _jsonData.sprite.color);
    }
    return armor;
  }

  constructor() {
    super();
    this.objectType = 'ARMOR';
  }

  onEquip(actor: Entity, letterInventory?: string) {
    actor.equipInventory(letterInventory);
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
