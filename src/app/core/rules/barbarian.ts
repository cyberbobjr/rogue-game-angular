import {IGameClass} from '../interfaces/i-game-class';

export class Barbarian implements IGameClass {
  name = 'Barbarian';

  static getHitDice(): number {
    return 12;
  }

  static getAC(): number {
    return 14;
  }
}
