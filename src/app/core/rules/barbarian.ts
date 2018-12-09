import {IGameClass} from '../interfaces/i-game-class';

export class Barbarian implements IGameClass {
  static getHitDice(): number {
    return 12;
  }
}
