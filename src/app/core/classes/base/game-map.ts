import {Position} from 'src/app/core/classes/base/position';
import {Tile} from './tile';
import PreciseShadowcasting from 'rot-js/lib/fov/precise-shadowcasting';
import {Utility} from '../Utility/utility';
import {Entity} from 'src/app/core/classes/base/entity';
import {Iobject} from '../../interfaces/iobject';
import {Room} from 'rot-js/lib/map/features';
import AStar from 'rot-js/lib/path/astar';
import {Path} from 'rot-js';
import {DoorTile} from '../tiles/door-tile';
import {GameEntities} from './game-entities';
import {Rooms} from './rooms';

export class GameMap {
  private readonly _data: Iobject[][];
  private _losMap: Array<Array<number>>;
  private _visibilityMap: Array<Array<number>>;
  private _seed: number;
  private _level: number;
  private _rooms: Rooms;
  private _gameEntities: GameEntities = new GameEntities();
  private _entryPosition: Position;
  private _exitPosition: Position;

  private _shadowCasting: PreciseShadowcasting = null;

  set gameEntities(value: GameEntities) {
    this._gameEntities = value;
  }

  get gameEntities(): GameEntities {
    return this._gameEntities;
  }

  set rooms(value: Array<Room>) {
    this._rooms = new Rooms(value);
  }

  get entities(): Array<Entity> {
    return this._gameEntities.getEntities();
  }

  set entities(value: Array<Entity>) {
    this._gameEntities.setEntities(value);
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
    this._losMap = Utility.initArrayNumber(this.width, this.height);
    this._visibilityMap = Utility.initArrayNumber(this.width, this.height);
    this._data = data ? Object.create(data) : Utility.initArrayString(this._width, this._height);
  }

  public setSeed(seed: number): this {
    this._seed = seed;
    return this;
  }

  public setLevel(level: number): this {
    this._level = level;
    return this;
  }

  public getDataAt(x: number, y: number): Iobject {
    return this._data[y][x];
  }

  private setDataAt(x: number, y: number, data: Iobject) {
    this._data[y][x] = data;
  }

  public setTile(tile: Tile) {
    if (!tile.position) {
      throw new Error('Position not found in tile ! ' + JSON.stringify(tile));
    }
    this.setDataAt(tile.position.x, tile.position.y, tile);
  }

  public extractLosMap(startPosX: number, startPosY: number, width: number, height: number): number[][] {
    return this._extract<number>(this._losMap, startPosX, startPosY, width, height);
  }

  public extractTiles(startPosX: number, startPosY: number, width: number, height: number): Tile[][] {
    return this._extract<Tile>(this._data, startPosX, startPosY, width, height);
  }

  private _extract<T>(source: any[][], startPosX: number, startPosY: number, width: number, height: number): T[][] {
    if (startPosX < 0) {
      startPosX = 0;
    }

    if (startPosY < 0) {
      startPosY = 0;
    }
    const {finalWidth, finalHeight} = this.calculateBounds(startPosX, startPosY, width, height);
    return this._getRawData(source, startPosX, startPosY, finalWidth, finalHeight);
  }

  private calculateBounds(startPosX: number, startPosY: number, width: number, height: number): { endPosX: number, endPosY: number, finalWidth: number, finalHeight: number } {
    const endPosX = ((startPosX + width) > this._width) ? this._width : (startPosX + width);
    const endPosY = ((startPosY + height) > this._height) ? this._height : (startPosY + height);

    const finalWidth: number = endPosX - startPosX;
    const finalHeight: number = endPosY - startPosY;
    return {endPosX, endPosY, finalWidth, finalHeight};
  }

  public computeLOSMap(mainActor: Entity): GameMap {
    const mainActorPosition: Position = mainActor.getPosition();
    const lightRadius: number = mainActor.lightRadius;
    const lightPower: number = mainActor.lightPower;
    this._createShadowCastingEngine();
    this._losMap = Utility.initArrayNumber(this.width, this.height);
    this._visibilityMap = Utility.initArrayNumber(this.width, this.height);
    this._shadowCasting.compute(mainActorPosition.x, mainActorPosition.y, lightRadius, (x: number, y: number, R: number, visibility: number) => {
      try {
        this._losMap[y][x] = R / lightPower;
        this._visibilityMap[y][x] = visibility;
      } catch (e) {
        console.log(e);
        console.trace();
      }
    });
    this._losMap[mainActorPosition.y][mainActorPosition.x] = 0.33;
    return this;
  }

  public getLosForPosition(position: Position): number {
    return this._losMap[position.y][position.x];
  }

  public getTilesAround(position: Position): Array<Array<Tile>> {
    return this._extract<Tile>(this._data, position.x - 1, position.y - 1, 3, 3);
  }

  public getTileAt(position: Position): Tile {
    return this.getDataAt(position.x, position.y) as Tile;
  }

  public getAllPosition<T>(ctor: { new(...args: any[]): T }): Array<Position> {
    const allPositions: Array<Position> = [];
    this._data.forEach((rows: Array<Iobject>) => {
      rows.forEach((tile: Iobject) => {
        if (tile instanceof ctor) {
          const chestTile: Tile & T = (tile as Tile & T);
          allPositions.push(chestTile.position.clone());
        }
      });
    });
    return allPositions;
  }

  public getFreeSlotForRoom(roomNumber: number): Position | null {
    return this._rooms.getFreeSlotForRoom(roomNumber);
  }

  private _createShadowCastingEngine() {
    this._shadowCasting = new PreciseShadowcasting((x: number, y: number) => {
      try {
        const info: Iobject = this.getDataAt(x, y);
        return (info instanceof Tile) ? !info.opaque : true;
      } catch (e) {
        return false;
      }
    }, {topology: 8});
  }

  private _getRawData<T>(source: T[][], startX: number, startY: number, width: number, height: number): T[][] {
    const arrayExtracted: T[][] = Utility.initArrayString(width, height);
    let y = 0;
    let x = 0;
    for (let j = startY; j < startY + height; j++) {
      for (let i = startX; i < startX + width; i++) {
        arrayExtracted[y][x] = source[j][i] as T;
        x++;
      }
      y++;
      x = 0;
    }
    return arrayExtracted;
  }

  public getNextPosition(originPosition: Position, destPosition: Position): Position | null {
    const astar: AStar = new Path.AStar(destPosition.x, destPosition.y, (x: number, y: number) => {
      const info: Iobject = this.getTileAt(new Position(x, y));
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

  private isPositionVisible(position: Position): boolean {
    return this.getLosForPosition(position) > 0;
  }

  public getEntitiesVisiblesOnMap(): Array<Entity> {
    return this._gameEntities
               .getAllEntities()
               .filter((entity: Entity) => {
                 return this.isPositionVisible(entity.getPosition());
               });
  }

}
