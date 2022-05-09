import {GameEvent} from './GameEvent';

export interface GameObserver {
    getId(): string;

    eventReceived(event: GameEvent);
}
