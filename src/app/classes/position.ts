import {Direction} from '../enums/direction.enum';

export class Position {
  private _x: number;
  private _y: number;

  get x(): number {
    return this._x;
  }

  set x(value: number) {
    this._x = value;
  }

  get y(): number {
    return this._y;
  }

  set y(value: number) {
    this._y = value;
  }

  constructor(posX: number, posY: number) {
    this._x = posX;
    this._y = posY;
  }

  computeDestination(direction: Direction): Position {
    switch (direction) {
      case Direction.N :
        return new Position(this._x, this._y - 1);
      case Direction.E:
        return new Position(this._x + 1, this._y);
      case Direction.NE:
        return new Position(this._x + 1, this._y - 1);
      case Direction.NW:
        return new Position(this._x - 1, this._y - 1);
      case Direction.S:
        return new Position(this._x, this._y + 1);
      case Direction.SE:
        return new Position(this._x + 1, this._y + 1);
      case Direction.SW:
        return new Position(this._x - 1, this._y + 1);
      case Direction.W:
        return new Position(this._x - 1, this._y);
      default:
        return new Position(this._x, this._y);
    }
  }
}
