import {Position} from 'src/app/core/classes/base/position';
import {Entity} from 'src/app/core/classes/base/entity';
import {Iobject} from '../../interfaces/iobject';
import {Tile} from './tile';
import AStar from 'rot-js/lib/path/astar';
import {Path} from 'rot-js';
import {DoorTile} from '../tiles/door-tile';
import {Monster} from '../entities/monster';
import {Sprite} from './sprite';
import PreciseShadowcasting from 'rot-js/lib/fov/precise-shadowcasting';
import {Player} from '../entities/player';
import {Utility} from '../utility';

export class GameMap<T extends object> {
  private _data: T[][];
  private _seed: number;
  private _level: number;

  private _entryPosition: Position;
  private _exitPosition: Position;

  private _preciseShadowcasting: PreciseShadowcasting = null;

  get entryPosition(): Position {
    return this._entryPosition;
  }

  set entryPosition(value: Position) {
    this._entryPosition = value;
  }

  get exitPosition(): Position {
    return this._exitPosition;
  }

  set exitPosition(value: Position) {
    this._exitPosition = value;
  }

  get level(): number {
    return this._level;
  }

  set level(value: number) {
    this._level = value;
  }

  set content(data: T[][]) {
    this._data = data;
  }

  get content(): T[][] {
    return this._data;
  }

  get width(): number {
    return this._width;
  }

  get height(): number {
    return this._height;
  }

  constructor(private _width?: number, private _height?: number, data?: T[][]) {
    this._data = data ? Object.create(data) : this._initArray(this._width, this._height);
  }

  setSeed(seed: number): this {
    this._seed = seed;
    return this;
  }

  setLevel(level: number): this {
    this._level = level;
    return this;
  }

  getDataAt(x: number, y: number): T {
    return <T>this._data[y][x];
  }

  setDataAt(x: number, y: number, data: T) {
    this._data[y][x] = data;
  }

  clone(): GameMap<T> {
    return this.extract(0, 0, this._width, this._height);
  }

  extract(startPosX: number, startPosY: number, width: number, height: number): GameMap<T> {
    if (startPosX < 0) {
      startPosX = 0;
    }

    if (startPosY < 0) {
      startPosY = 0;
    }

    const endPosX = ((startPosX + width) > this._width) ? this._width : (startPosX + width);
    const endPosY = ((startPosY + height) > this._height) ? this._height : (startPosY + height);

    const finalWidth: number = endPosX - startPosX;
    const finalHeight: number = endPosY - startPosY;

    const arrayExtracted: T[][] = this._getRawData(startPosX, startPosY, finalWidth, finalHeight);

    return new GameMap<T>(finalWidth, finalHeight, arrayExtracted);
  }

  computeFOVMap(lightRadius: number, lightPower: number, position: Position): Array<Array<number>> {
    const fovMap: Array<Array<number>> = Utility.initArrayNumber(this.width, this.height);
    this._preciseShadowcasting.compute(position.x, position.y, lightRadius, (x: number, y: number, R: number, visibility: number) => {
      try {
        fovMap[y][x] = R / lightPower;
      } catch (e) {
      }
    });
    return fovMap;
  }

  public createFovCasting(): GameMap<T> {
    this._preciseShadowcasting = new PreciseShadowcasting((x: number, y: number) => {
      try {
        const info = <Tile>this.getDataAt(x, y);
        return !info.opaque;
      } catch (e) {
        return false;
      }
    }, {topology: 8});
    return this;
  }

  private _getRawData(startX, startY, width, height): T[][] {
    const arrayExtracted: T[][] = this._initArray(width, height);
    let y = 0;
    let x = 0;
    for (let j = startY; j < startY + height; j++) {
      for (let i = startX; i < startX + width; i++) {
        arrayExtracted[y][x] = Object.create(this._data[j][i]) as T;
        x++;
      }
      y++;
      x = 0;
    }
    return arrayExtracted;
  }

  private _initArray(width: number, height: number, fill = '.'): T[][] {
    const newArray = new Array(height);
    newArray.fill(fill);
    newArray.forEach((value: any, index: number) => {
      newArray[index] = new Array(width).fill(fill);
    });
    return newArray;
  }

  getTilesAround(position: Position): Array<Array<Tile>> {
    const test: GameMap<Tile> = this.extract(position.x - 1, position.y - 1, 3, 3) as GameMap<Tile>;
    return test.content;
  }

  getTileAt(position: Position): Tile {
    return <Tile>this.getDataAt(position.x, position.y);
  }
}
