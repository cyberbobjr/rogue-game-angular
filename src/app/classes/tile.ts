import {Entity} from './entity';

export class Tile {
  private _character: string;
  private _color = 'gray';

  get color(): string {
    return this._color;
  }

  set color(value: string) {
    this._color = value;
  }

  get character(): string {
    return this._character;
  }

  set character(value: string) {
    this._character = value;
  }

  isWalkable(): boolean {
    return false;
  }

  onWalk(actor: Entity): void {

  }

  onHit(actor: Entity): void {

  }
}
