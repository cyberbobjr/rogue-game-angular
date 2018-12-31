import * as weapons from '../rules/object/weapons.json';
import * as armors from '../rules/object/armors.json';
import {Weapon} from '../classes/gameObjects/weapon';
import {GameObject} from '../classes/gameObjects/game-object';
import {Gold} from '../classes/gameObjects/gold';
import {SlotType} from '../enums/equiped-type.enum';
import {Armor} from '../classes/gameObjects/armor';
import {Potion} from '../classes/gameObjects/potion';
import {GameObjectType} from '../enums/game-object-type.enum';
import {Torch} from '../classes/gameObjects/torch';

export class GameObjectFactory {
  private static instance: GameObjectFactory;
  private _weapons: Map<string, Weapon> = new Map<string, Weapon>();
  private _armors: Map<string, Armor> = new Map<string, Armor>();

  constructor() {
    console.log('GameObjectFactory created');
    for (const key of Object.keys(weapons.default)) {
      this._weapons.set(weapons.default[key]['id'], new Weapon(weapons.default[key]));
    }
    for (const key of Object.keys(armors.default)) {
      this._armors.set(armors.default[key]['id'], new Armor(armors.default[key]));
    }
  }

  static canBeEquipped(where: SlotType, item: GameObject): boolean {
    if (item instanceof Weapon && (where === SlotType.LEFTHAND || where === SlotType.RIGHTHAND)) {
      return true;
    }
    if (item instanceof Gold) {
      return false;
    }
    return false;
  }

  static getInstance() {
    if (!GameObjectFactory.instance) {
      GameObjectFactory.instance = new GameObjectFactory();
    }
    return GameObjectFactory.instance;
  }

  static create(objectType: GameObjectType, id?: string): GameObject {
    switch (objectType) {
      case GameObjectType.TORCH:
        return new Torch();
      case GameObjectType.POTION:
        return new Potion();
      case GameObjectType.ARMOR:
        return GameObjectFactory.getInstance()
                                .getArmorById(id);
      case GameObjectType.WEAPON:
        return GameObjectFactory.getInstance()
                                .getWeaponById(id);
      default:
        return null;
    }
  }

  static createFromJson(objectType: string, data: any): GameObject | null {
    switch (objectType) {
      case 'GOLD' :
        return new Gold(data['_amount']);
      case 'WEAPON' :
        return Weapon.fromJson(data['_jsonData']);
      case 'ARMOUR' :
        return Armor.fromJson(data['_jsonData']);
      case 'POTION' :
        return new Potion();
      case 'FOOD' :
        return null;
      case 'TORCH' :
        return new Torch();
      default:
        return null;
    }
  }

  getWeaponById(weaponId: string): Weapon | null {
    return this._weapons.get(weaponId);
  }

  getArmorById(armorId: string): Armor | null {
    return this._armors.get(armorId);
  }
}
