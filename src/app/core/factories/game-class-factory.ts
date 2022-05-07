import * as gameclasses from '../data/class/class.json';
import {ClassType} from '../enums/class-type.enum';
import {GameClass} from '../classes/base/game-class';

export class GameClassFactory {
    private static instance: GameClassFactory;
    private _gameClasses: Map<string, GameClass> = new Map<string, GameClass>();

    static getInstance() {
        if (!GameClassFactory.instance) {
            GameClassFactory.instance = new GameClassFactory();
        }
        return GameClassFactory.instance;
    }

    createGameClass(classType: ClassType): GameClass | null {
        switch (classType) {
            case ClassType.BARBARIAN:
                return this._gameClasses.get('BARBARIAN');
            default:
                return null;
        }
    }

    constructor() {
        console.log('GameClassFactory created');
        for (const key of Object.keys(gameclasses)) {
            this._gameClasses.set(gameclasses[key].id, new GameClass(gameclasses[key]));
        }
    }
}
