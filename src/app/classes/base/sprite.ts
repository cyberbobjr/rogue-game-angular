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

  ColorLuminance() {
    // validate hex string
    let hex = String(this._color)
      .replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }

    // convert to decimal and change luminosity
    let rgb = '#', c, i;
    for (i = 0; i < 3; i++) {
      c = parseInt(hex.substr(i * 2, 2), 16);
      c = Math.round(Math.min(Math.max(0, c + (c * this._visibility)), 255))
              .toString(16);
      rgb += ('00' + c).substr(c.length);
    }
    return rgb;
  }
}
