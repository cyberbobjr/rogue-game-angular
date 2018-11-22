import {Injectable} from '@angular/core';
import {IMapEngine} from '../interfaces/i-map-engine';
import Arena from 'rot-js/lib/map/arena';
import {Position} from '../classes/position';
import {GameMap} from '../classes/gameMap';
import {Tile} from '../classes/tile';
import {TilesFactory} from '../factories/tiles-factory';
import {TileType} from '../enums/tile-type.enum';

@Injectable({
              providedIn: 'root'
            })
export class MapEngine implements IMapEngine {
  private _width: number;
  private _height: number;
  private _map: GameMap<Tile> = null;
  private _tileFactory: TilesFactory = new TilesFactory();

  get width(): number {
    return this._width;
  }

  set width(value: number) {
    this._width = value;
  }

  get height(): number {
    return this._height;
  }

  set height(value: number) {
    this._height = value;
  }

  get map(): GameMap<Tile> {
    return this._map;
  }

  set map(value: GameMap<Tile>) {
    this._map = value;
  }

  constructor() {
  }

  generateNewMap(width: number, height: number): GameMap<Tile> {
    this._width = width;
    this._height = height;
    this._createMap(width, height);
    return this._map;
  }

  private _createMap(width: number, height: number) {
    this._map = new GameMap<Tile>(width, height);
    const arena = new Arena(width, height);
    arena.create((y: number, x: number, value: number) => {
      this._map.content[y][x] = this._tileFactory.createTile((value === 1) ? TileType.WALL : TileType.FLOOR);
    });
  }

  isWalkable(position: Position): boolean {
    //return (this._map.content[position.y][position.x].character !== TileType.WALL);
    return true;
  }
}
