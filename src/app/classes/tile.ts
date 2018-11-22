export class Tile {
  private _character: string;

  get character(): string {
    return this._character;
  }

  set character(value: string) {
    this._character = value;
  }

  constructor(character: string) {
    this.character = character;
  }
}
