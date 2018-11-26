export class Sprite {
  protected _light: boolean;

  get light(): boolean {
    return this._light;
  }

  set light(value: boolean) {
    this._light = value;
  }

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
    this._light = false;
  }
}
