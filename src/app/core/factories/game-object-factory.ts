import * as weapon from '../rules/object/weapons.json';
import {Weapon} from '../classes/base/weapon';

export class GameObjectFactory {
  private static instance: GameObjectFactory;

  constructor() {
    console.log(weapon[0]);
    const weaponObject: Weapon = new Weapon(weapon[0]);
    console.log(weaponObject);
  }

  static getInstance() {
    if (!GameObjectFactory.instance) {
      GameObjectFactory.instance = new GameObjectFactory();
    }
    return GameObjectFactory.instance;
  }

  generateRandomWeapon() {

  }
}
