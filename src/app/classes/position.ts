import {Direction} from '../enums/direction.enum';

export class Position {
  x: number;
  y: number;

  constructor(posX: number, posY: number) {
    this.x = posX;
    this.y = posY;
  }

  computeDestination(direction: Direction): { x: number, y: number } {
    switch (direction) {
      case Direction.N :
        return {x: this.x, y: this.y - 1};
      case Direction.E:
        return {x: this.x + 1, y: this.y};
      case Direction.NE:
        return {x: this.x + 1, y: this.y - 1};
      case Direction.NW:
        return {x: this.x - 1, y: this.y - 1};
      case Direction.S:
        return {x: this.x, y: this.y + 1};
      case Direction.SE:
        return {x: this.x + 1, y: this.y + 1};
      case Direction.SW:
        return {x: this.x - 1, y: this.y + 1};
      case Direction.W:
        return {x: this.x - 1, y: this.y};
      default:
        return {x: this.x, y: this.y};
    }

  }
}
