import * as races from '../data/race/race.json';
import {RaceType} from '../enums/race-type.enum';
import {GameRace} from '../core/base/game-race';

export class RaceFactory {
    private static instance: RaceFactory;
    private _races: Map<string, GameRace> = new Map<string, GameRace>();

    static getInstance() {
        if (!RaceFactory.instance) {
            RaceFactory.instance = new RaceFactory();
        }
        return RaceFactory.instance;
    }

    constructor() {
        console.log('RaceFactory created');
        for (const key of Object.keys(races)) {
            this._races.set(races[key].id, new GameRace(races[key]));
        }
    }

    createRace(raceType: RaceType): GameRace | null {
        switch (raceType) {
            case RaceType.HUMAN:
                return this._races.get('HUMAN');
            default:
                return null;
        }
    }
}
