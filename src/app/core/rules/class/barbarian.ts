import {IGameClass} from '../../interfaces/i-game-class';
import {Utility} from '../../classes/utility';

export class Barbarian implements IGameClass {
  static modifiers = new Map<string, number>([
                                               ['strength', 3],
                                               ['dexterity', 2],
                                               ['constitution', 2],
                                               ['intelligence', -1],
                                               ['wisdom', 1],
                                               ['charisma', 0]
                                             ]);
  name = 'Barbarian';

  getHitDice(): number {
    return 12;
  }

  getAC(): number {
    return 14;
  }

  getHp(): number {
    return Utility.rolldice(this.getHitDice());
  }

  getModifier(ability: string): number {
    return Barbarian.modifiers.get(ability);
  }

  getGp(): number {
    return 5 * Utility.rolldice(4) * 10;
  }
}
