import {IGameClass} from '../interfaces/i-game-class';

export class Barbarian implements IGameClass {
  getHitDice(): number {
    return 12;
  }
}
