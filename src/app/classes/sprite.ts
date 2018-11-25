export class Sprite {
  get character(): string {
    return this._character;
  }

  set character(value: string) {
    this._character = value;
  }

  get color(): string {
    return this._color;
  }

  set color(value: string) {
    this._color = value;
  }

  constructor(private _character: string, private _color: string = 'grey') {

  }
}
