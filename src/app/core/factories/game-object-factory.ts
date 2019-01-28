import * as weapons from '../rules/object/weapons.json';
import * as armors from '../rules/object/armors.json';
import {Weapon} from '../classes/gameObjects/weapon';
import {GameObject} from '../classes/gameObjects/game-object';
import {Gold} from '../classes/gameObjects/gold';
import {Armor} from '../classes/gameObjects/armor';
import {Potion} from '../classes/gameObjects/potion';
import {GameObjectType} from '../enums/game-object-type.enum';
import {Torch} from '../classes/gameObjects/torch';
import {Food} from '../classes/gameObjects/food';
import {Utility} from '../classes/utility';

export class GameObjectFactory {
  private static instance: GameObjectFactory;
  private _weapons: Map<string, Weapon> = new Map<string, Weapon>();
  private _armors: Map<string, Armor> = new Map<string, Armor>();

  constructor() {
    console.log('GameObjectFactory created');
    for (const key of Object.keys(weapons.default)) {
      this._weapons.set(weapons.default[key]['id'], Weapon.fromJson(weapons.default[key]));
    }
    for (const key of Object.keys(armors.default)) {
      this._armors.set(armors.default[key]['id'], Armor.fromJson(armors.default[key]));
    }
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
      case GameObjectType.FOOD:
        return new Food();
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
        return Weapon.fromJson(data);
      case 'ARMOUR' :
        return Armor.fromJson(data);
      case 'POTION' :
        return Potion.fromJson(data);
      case 'FOOD' :
        return Food.fromJson(data);
      case 'TORCH' :
        return Torch.fromJson(data);
      default:
        return null;
    }
  }

  generateRandomObjects(nbObjects: number): Array<GameObject> {
    const chestContents: Array<GameObject> = [];
    for (let i = 0; i < nbObjects; i++) {
      chestContents.push(this._createRandomObject(GameObjectType.getRandomType()));
    }
    return chestContents;
  }

  private _createRandomObject(type: GameObjectType): GameObject {
    switch (type) {
      case GameObjectType.GOLD :
        return new Gold(Utility.rolldice(10));
      case GameObjectType.TORCH:
        return new Torch();
      case GameObjectType.WEAPON:
        return this._getRandomWeapon();
      case GameObjectType.ARMOR:
        return this._getRandomArmor();
      case GameObjectType.POTION:
        return new Potion();
      case GameObjectType.FOOD:
        return new Food();
    }
  }

  private _getRandomWeapon(): GameObject {
    const weaponCount: number = this._weapons.size;
    const items: Array<Weapon> = Array.from(this._weapons.values());
    return items[Utility.rolldice(weaponCount) - 1];
  }

  private _getRandomArmor(): GameObject {
    const armorCount: number = this._armors.size;
    const items: Array<Armor> = Array.from(this._armors.values());
    return items[Utility.rolldice(armorCount) - 1];
  }

  getWeaponById(weaponId: string): Weapon | null {
    return this._weapons.get(weaponId);
  }

  getArmorById(armorId: string): Armor | null {
    return this._armors.get(armorId);
  }

}
