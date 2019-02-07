import {Position} from 'src/app/core/classes/base/position';
import {Tile} from './tile';
import PreciseShadowcasting from 'rot-js/lib/fov/precise-shadowcasting';
import {Utility} from '../utility';
import {Entity} from 'src/app/core/classes/base/entity';
import {Iobject} from '../../interfaces/iobject';
import {Room} from 'rot-js/lib/map/features';
import {ChestTile} from '../tiles/chest-tile';

export class GameMap {
  private _data: Iobject[][];
  private _fovMap: Array<Array<number>>;
  private _seed: number;
  private _level: number;
  private _rooms: Array<Room> = [];
  private _entities: Array<Entity> = [];

  private _entryPosition: Position;
  private _exitPosition: Position;

  private _preciseShadowcasting: PreciseShadowcasting = null;

  set rooms(value: Array<Room>) {
    this._rooms = value;
  }

  get entities(): Array<Entity> {
    return this._entities;
  }

  set entities(value: Array<Entity>) {
    this._entities = value;
  }

  get fovMap(): Array<Array<number>> {
    return this._fovMap;
  }

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

  set content(data: Iobject[][]) {
    this._data = data;
  }

  get content(): Iobject[][] {
    return this._data;
  }

  get width(): number {
    return this._width;
  }

  get height(): number {
    return this._height;
  }

  constructor(private _width?: number, private _height?: number, data?: Tile[][]) {
    this._fovMap = Utility.initArrayNumber(this.width, this.height);
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

  getDataAt(x: number, y: number): Iobject {
    return this._data[y][x];
  }

  setDataAt(x: number, y: number, data: Iobject) {
    this._data[y][x] = data;
    data.position = new Position(x, y);
  }

  clone(): GameMap {
    return this.extract(0, 0, this._width, this._height);
  }

  extract(startPosX: number, startPosY: number, width: number, height: number): GameMap {
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

    const arrayExtracted: Tile[][] = this._getRawData(startPosX, startPosY, finalWidth, finalHeight);

    const gameMap: GameMap = new GameMap(finalWidth, finalHeight, arrayExtracted);
    gameMap._fovMap = this._getRawFovData(startPosX, startPosY, finalWidth, finalHeight);
    gameMap._preciseShadowcasting = this._preciseShadowcasting;
    return gameMap;
  }

  public putEntities(entities: Array<Entity>): GameMap {
    entities.forEach((entity: Entity) => {
      this.setDataAt(entity.position.x, entity.position.y, entity);
    });
    return this;
  }

  public computeFOVMap(lightRadius: number, lightPower: number, position: Position): GameMap {
    this._preciseShadowcasting.compute(position.x, position.y, lightRadius, (x: number, y: number, R: number, visibility: number) => {
      try {
        this._fovMap[y][x] = R / lightPower;
        if (this.getDataAt(x, y) instanceof Entity) {
          (this.getDataAt(x, y) as Entity).sprite.light = (visibility === 1);
        }
      } catch (e) {
      }
    });
    this._fovMap[position.y][position.x] = 0.001;
    return this;
  }

  public createFovCasting(): GameMap {
    this._preciseShadowcasting = new PreciseShadowcasting((x: number, y: number) => {
      try {
        const info: Iobject = this.getDataAt(x, y);
        return (info instanceof Tile) ? !info.opaque : true;
      } catch (e) {
        return false;
      }
    }, {topology: 8});
    return this;
  }

  public getTilesAround(position: Position): Array<Array<Iobject>> {
    const test: GameMap = this.extract(position.x - 1, position.y - 1, 3, 3) as GameMap;
    return test.content;
  }

  public getTileAt(position: Position): Tile {
    return this.getDataAt(position.x, position.y) as Tile;
  }

  public getAllChestsPosition(): Array<Position> {
    const chestsPositions: Array<Position> = [];
    this._data.forEach((rows: Array<Iobject>) => {
      rows.forEach((tile: Iobject) => {
        if (tile instanceof ChestTile) {
          const chestTile: ChestTile = (tile as ChestTile);
          chestsPositions.push(chestTile.position.clone());
        }
      });
    });
    return chestsPositions;
  }

  private _getRawFovData(startX, startY, width, height) {
    const arrayExtracted: number[][] = Utility.initArrayNumber(width, height);
    let y = 0;
    let x = 0;
    for (let j = startY; j < startY + height; j++) {
      for (let i = startX; i < startX + width; i++) {
        arrayExtracted[y][x] = this._fovMap[j][i];
        x++;
      }
      y++;
      x = 0;
    }
    return arrayExtracted;
  }

  private _getRawData(startX, startY, width, height): Tile[][] {
    const arrayExtracted: Tile[][] = this._initArray(width, height);
    let y = 0;
    let x = 0;
    for (let j = startY; j < startY + height; j++) {
      for (let i = startX; i < startX + width; i++) {
        arrayExtracted[y][x] = Object.create(this._data[j][i]) as Tile;
        x++;
      }
      y++;
      x = 0;
    }
    return arrayExtracted;
  }

  private _initArray(width: number, height: number, fill = '.'): Tile[][] {
    const newArray = new Array(height);
    newArray.fill(fill);
    newArray.forEach((value: any, index: number) => {
      newArray[index] = new Array(width).fill(fill);
    });
    return newArray;
  }
}
