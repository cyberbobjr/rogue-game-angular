import {Position} from '../classes/base/position';
import {Room} from 'rot-js/lib/map/features';

export interface GameMap {
    get rooms(): Array<Room>;

    getFreePositionForRoom(roomNumber: number): Position | null;
}
