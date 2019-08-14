import {Room} from 'rot-js/lib/map/features';
import {Position} from './position';
import {Utility} from '../Utility/utility';

export class Rooms {
  private _rooms: Array<Room> = [];

  get rooms(): Array<Room> {
    return this._rooms;
  }

  constructor(rooms: Array<Room>) {
    this._rooms = rooms;
  }

  public getFreeSlotForRoom(roomNumber: number): Position | null {
    let randomX: number;
    let randomY: number;
    const roomPosition: [Position, Position] = this._getRoomPosition(roomNumber); // topleft, bottomright
    randomX = Utility.getRandomInt(roomPosition[0].x + 1, roomPosition[1].x - 1);
    randomY = Utility.getRandomInt(roomPosition[0].y + 1, roomPosition[1].y - 1);
    return new Position(randomX, randomY);
  }

  private _getRoomPosition(roomNumber: number): [Position, Position] {
    const room: Room = this._rooms[roomNumber];
    const topleft: Position = new Position(room.getLeft(), room.getTop());
    const bottomright: Position = new Position(room.getRight(), room.getBottom());
    return [topleft, bottomright];
  }
}
