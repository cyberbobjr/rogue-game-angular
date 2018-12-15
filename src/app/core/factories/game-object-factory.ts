import * as weapon from '../rules/object/weapons.json';

export class GameObjectFactory {
  private static instance: GameObjectFactory;

  constructor() {
    console.log(weapon[0].name);
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
