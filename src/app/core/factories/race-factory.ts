import * as races from '../rules/race/race.json';
import {RaceType} from '../enums/race-type.enum';
import {RaceClass} from '../classes/base/race';

export class RaceFactory {
  private static instance: RaceFactory;
  private _races: Map<string, RaceClass> = new Map<string, RaceClass>();

  static getInstance() {
    if (!RaceFactory.instance) {
      RaceFactory.instance = new RaceFactory();
    }
    return RaceFactory.instance;
  }

  constructor() {
    console.log('RaceFactory created');
    for (const key of Object.keys(races.default)) {
      this._races.set(races.default[key].id, new RaceClass(races.default[key]));
    }
  }

  createRace(raceType: RaceType): RaceClass | null {
    switch (raceType) {
      case RaceType.HUMAN:
        return this._races.get('HUMAN');
      default:
        return null;
    }
  }
}
