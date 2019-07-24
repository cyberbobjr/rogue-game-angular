import * as Color from 'color';
import {JsonSprite} from '../../interfaces/json-interfaces';
import {ISprite} from 'src/app/core/interfaces/i-sprite';

export class Sprite implements ISprite {
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
      .hex();
  }

  set color(value: string) {
    this._color = value;
  }

  set bgColor(value: string) {
    this._bgColor = value;
  }

  get bgColor(): string {
    return Color(this._bgColor)
      .hex();
  }

  static fromJson(jsonData: JsonSprite): Sprite {
    const {character, color, bgColor, light, visibility} = jsonData;
    const sprite: Sprite = new this(character, color, bgColor);
    sprite.light = light;
    sprite.visibility = visibility;
    return sprite;
  }

  toJSON(): JsonSprite {
    return {
      character: this._character,
      color: this._color,
      bgColor: this._bgColor
    };
  }

  constructor(private _character: string,
              private _color: string = '#afafaf',
              private _bgColor: string = '#000000',
              private _light = false) {
  }

  clone(): Sprite {
    return new Sprite(this._character, this._color, this._bgColor, this._light);
  }
}
