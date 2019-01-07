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

export class GameMap<T extends object> {
  private _data: T[][];
  private _seed: number;
  private _level: number;

  private _entryPosition: Position;
  private _exitPosition: Position;

  private _entities: Array<Entity> = [];
  private _entitiesVisibles: Array<Entity> = [];
  private _preciseShadowcasting: PreciseShadowcasting = null;

  get entitiesVisibles(): Array<Entity> {
    return this._entitiesVisibles;
  }

  get entities(): Array<Entity> {
    return this._entities;
  }

  set entities(value: Array<Entity>) {
    this._entities = value;
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

  getTilesAround(position: Position): Array<Array<T>> {
    const test: GameMap<T> = this.extract(position.x - 1, position.y - 1, 3, 3);
    return test.content;
  }

  getTileOrEntityAt(position: Position): Iobject {
    const monster: Iobject = this.getEntityAt(position);
    if (monster) {
      return monster;
    }
    return <Iobject>this.getDataAt(position.x, position.y);
  }

  getEntityAt(position: Position): Entity | null {
    let monster: Entity = null;
    this._entities.forEach((value: Entity, index: number) => {
      if (value.position.equal(position)) {
        monster = value;
      }
    });
    return monster;
  }

  getTileAt(position: Position): Tile {
    return <Tile>this.getDataAt(position.x, position.y);
  }

  getDirectionFromPositionToPosition(originPosition: Position, destPosition: Position): Position | null {
    const astar: AStar = new Path.AStar(destPosition.x, destPosition.y, (x: number, y: number) => {
      const info: Iobject = this.getTileOrEntityAt(new Position(x, y));
      if (info instanceof Entity) {
        return true;
      }
      if (info instanceof Tile && info.isWalkable()) {
        return true;
      }
      return info instanceof DoorTile && (info as DoorTile).isClosed;
    });
    let target: Position = null;
    let count = 0;
    astar.compute(originPosition.x, originPosition.y, (x: number, y: number) => {
      count++;
      if (count !== 2) {
        return;
      }
      target = new Position(x, y);
    });
    return target;
  }

  computeFOV(mainActor: Player, position: Position): GameMap<T> {
    if (!mainActor) {
      return;
    }
    const lightRadius: number = mainActor.lightRadius;
    const lightPower: number = mainActor.ligthPower;
    const finalMap: GameMap<T> = this.clone();
    this._resetLightMap(finalMap);
    this._entitiesVisibles.splice(0);
    this._preciseShadowcasting.compute(position.x, position.y, lightRadius, (x: number, y: number, R: number, visibility: number) => {
      try {
        const tile: Iobject = <Iobject>finalMap.getDataAt(x, y);
        const sprite = tile.sprite;
        sprite.light = true;
        sprite.visibility = R / lightPower;
        if (tile instanceof Monster && sprite.visibility > 0) {
          this._entitiesVisibles.push(<Entity>finalMap.getDataAt(x, y));
        }
      } catch (e) {
      }
    });
    return finalMap;
  }

  private _resetLightMap(gameMap: GameMap<T>) {
    for (let j = 0; j < gameMap.height; j++) {
      for (let i = 0; i < gameMap.width; i++) {
        const sprite: Sprite = (gameMap.getDataAt(i, j) as Iobject).sprite;
        if (sprite) {
          sprite.light = false;
        }
      }
    }
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
}
