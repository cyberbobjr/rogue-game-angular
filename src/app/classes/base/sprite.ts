import * as Color from 'color';

export class Sprite {
  protected _light: boolean;
  protected _visibility = 0;

  get visibility(): number {
    return this._visibility;
  }

  set visibility(value: number) {
    this._visibility = value;
  }

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
    return Color(this._color)
      .darken(this._visibility)
      .hex();
  }

  set color(value: string) {
    this._color = value;
  }

  get bgColor(): string {
    return Color(this._bgColor)
      .darken(this._visibility)
      .hex();
  }

  constructor(private _character: string, private _color: string = '#afafaf', private _bgColor: string = '#000000') {
    this._light = false;
  }
}
