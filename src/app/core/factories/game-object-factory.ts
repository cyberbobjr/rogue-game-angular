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

  createFromJson(objectType: string, jsonData: any): GameObject | null {
    switch (objectType) {
      case 'GOLD' :
        return new Gold(jsonData['_amount']);
      case 'WEAPON' :
        return this._weapons.get(jsonData['id']);
      default:
        return null;
    }
  }

  getWeaponById(weaponId: string): Weapon | null {
    return this._weapons.get(weaponId);
  }
}
