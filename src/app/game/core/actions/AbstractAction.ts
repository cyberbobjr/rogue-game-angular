import {Entity} from '../base/entity';
import {GameEngine} from '../engines/GameEngine';
import {BusEventsGame} from '@core/core/busEvents/BusEventsGame';

export class AbstractAction {
    protected _busGameEvent: BusEventsGame;

    constructor(protected _target: Entity, protected _gameEngine: GameEngine) {
        this._busGameEvent = this._gameEngine?.getBusEventGame();
    }
}
