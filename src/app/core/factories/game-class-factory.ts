import {ClassType} from '../enums/class-type.enum';
import {IGameClass} from '../interfaces/i-game-class';
import {Barbarian} from '../rules/class/barbarian';

export class GameClassFactory {
  static createGameClass(classType: ClassType): IGameClass | null {
    switch (classType) {
      case ClassType.BARBARIAN:
        return new Barbarian();
      default:
        return null;
    }
  }
}
