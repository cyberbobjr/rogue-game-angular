import {GameEvent} from './GameEvent';
import {GameObserver} from './GameObserver';

export class BusEventsGame {
    private _observers: Map<string, GameObserver> = new Map<string, GameObserver>();

    dispatch(gameevent: GameEvent) {
        this._observers.forEach(o => o.eventReceived(gameevent));
    }

    subscribe(gameObserver: GameObserver) {
        this._observers.set(gameObserver.getId(), gameObserver);
    }

    unsubscribe(id: string) {
        this._observers.delete(id);
    }
}
