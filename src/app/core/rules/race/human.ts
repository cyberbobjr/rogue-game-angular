import {IRace} from '../../interfaces/i-race';

export class Human implements IRace {
  static modifiers = new Map<string, number>([
                                               ['strength', 1],
                                               ['dexterity', 1],
                                               ['constitution', 1],
                                               ['intelligence', 1],
                                               ['wisdom', 1],
                                               ['charisma', 1]
                                             ]);
  name = 'Human';

  getModifier(ability: string): number {
    return Human.modifiers.get(ability);
  }
}
