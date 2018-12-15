import * as weapons from '../rules/object/weapons.json';
import {Weapon} from '../classes/base/weapon';
import {Utility} from '../classes/utility';

export class GameObjectFactory {
  private static instance: GameObjectFactory;
  private _weapons: Array<Weapon> = [];

  constructor() {
    console.log('GameObjectFactory created');
    for (const key of Object.keys(weapons.default)) {
      this._weapons.push(new Weapon(weapons.default[key]));
    }
  }

  static getInstance() {
    if (!GameObjectFactory.instance) {
      GameObjectFactory.instance = new GameObjectFactory();
    }
    return GameObjectFactory.instance;
  }

  getRandomWeapon(): Weapon {
    const randomNumber = Utility.rolldice(this._weapons.length);
    return this._weapons[randomNumber];
  }

  getWeaponByName(weaponName: string): Weapon | null {
    return this._weapons.find((weapon: Weapon) => {
      return weapon.name === weaponName;
    });
  }
}
