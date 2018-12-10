import {RaceType} from '../enums/race-type.enum';
import {Human} from '../rules/race/human';
import {IRace} from '../interfaces/i-race';

export class RaceFactory {
  static createRace(raceType: RaceType): IRace | null {
    switch (raceType) {
      case RaceType.HUMAN:
        return new Human();
      default:
        return null;
    }
  }
}
