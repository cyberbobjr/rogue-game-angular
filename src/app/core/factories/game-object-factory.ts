import * as weapons from '../rules/object/weapons.json';
import {Weapon} from '../classes/base/weapon';
import {GameObject} from '../classes/base/game-object';
import {Gold} from '../classes/base/gold';

export class GameObjectFactory {
  private static instance: GameObjectFactory;
  private _weapons: Map<string, Weapon> = new Map<string, Weapon>();

  constructor() {
    console.log('GameObjectFactory created');
    for (const key of Object.keys(weapons.default)) {
      this._weapons.set(weapons.default[key]['id'], new Weapon(weapons.default[key]));
    }
  }

  static getInstance() {
    if (!GameObjectFactory.instance) {
      GameObjectFactory.instance = new GameObjectFactory();
    }
    return GameObjectFactory.instance;
  }

  createFromJson(jsonData: any): GameObject | null {
    switch (jsonData['id']) {
      case 'GOLD' :
        return new Gold(jsonData['_amount']);
      default:
        return this._weapons.get(jsonData['id']);
    }
  }

  getRandomWeapon(): Weapon | null {
    const weaponArray = Array.from(this._weapons);
    return weaponArray[Math.floor(Math.random() * weaponArray.length)][1];
  }

  getWeaponById(weaponId: string): Weapon | null {
    return this._weapons.get(weaponId);
  }
}
