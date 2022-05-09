import {Room} from 'rot-js/lib/map/features';
import {Position2D} from './position2D';
import {Utility} from '../Utility/utility';

export class Rooms {
    private readonly _rooms: Array<Room> = [];

    get rooms(): Array<Room> {
        return this._rooms;
    }

    constructor(rooms: Array<Room>) {
        this._rooms = rooms;
    }

    public getFreeSlotForRoom(roomNumber: number): Position2D | null {
        let randomX: number;
        let randomY: number;
        const roomPosition: [Position2D, Position2D] = this._getRoomPosition(roomNumber); // topleft, bottomright
        randomX = Utility.getRandomInt(roomPosition[0].x + 1, roomPosition[1].x - 1);
        randomY = Utility.getRandomInt(roomPosition[0].y + 1, roomPosition[1].y - 1);
        return new Position2D(randomX, randomY);
    }

    private _getRoomPosition(roomNumber: number): [Position2D, Position2D] {
        const room: Room = this._rooms[roomNumber];
        const topleft: Position2D = new Position2D(room.getLeft(), room.getTop());
        const bottomright: Position2D = new Position2D(room.getRight(), room.getBottom());
        return [topleft, bottomright];
    }
}
