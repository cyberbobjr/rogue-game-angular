import {Direction} from '../../enums/direction.enum';
import {JsonPosition} from '../../interfaces/json-interfaces';

export class Position2D {
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

    static fromJson(jsonData: JsonPosition): Position2D {
        return new this(jsonData.x, jsonData.y);
    }

    constructor(posX: number, posY: number) {
        this._x = posX;
        this._y = posY;
    }

    toJSON(): JsonPosition {
        return {
            x: this._x,
            y: this._y
        };
    }

    computeDestination(direction: Direction): Position2D {
        switch (direction) {
            case Direction.N :
                return new Position2D(this._x, this._y - 1);
            case Direction.E:
                return new Position2D(this._x + 1, this._y);
            case Direction.NE:
                return new Position2D(this._x + 1, this._y - 1);
            case Direction.NW:
                return new Position2D(this._x - 1, this._y - 1);
            case Direction.S:
                return new Position2D(this._x, this._y + 1);
            case Direction.SE:
                return new Position2D(this._x + 1, this._y + 1);
            case Direction.SW:
                return new Position2D(this._x - 1, this._y + 1);
            case Direction.W:
                return new Position2D(this._x - 1, this._y);
            default:
                return new Position2D(this._x, this._y);
        }
    }

    equal(position: Position2D): boolean {
        return (position.x === this._x && position.y === this.y);
    }

    clone(): Position2D {
        return new Position2D(this.x, this.y);
    }
}
