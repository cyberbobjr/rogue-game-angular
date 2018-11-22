import {Injectable} from '@angular/core';
import {IMapEngine} from '../interfaces/i-map-engine';
import Arena from 'rot-js/lib/map/arena';
import {Position} from '../classes/position';
import Digger from 'rot-js/lib/map/digger';
import {Utility} from '../classes/utility';
import {GameMap} from '../classes/gameMap';

@Injectable({
              providedIn: 'root'
            })
export class MapEngine implements IMapEngine {
  private _width: number;
  private _height: number;
  private _map: GameMap = null;

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

  get map(): GameMap {
    return this._map;
  }

  set map(value: GameMap) {
    this._map = value;
  }

  constructor() {
  }

  generateNewMap(width: number, height: number): GameMap {
    this._width = width;
    this._height = height;
    this._createMap(width, height);
    return this._map;
  }

  private _createMap(width: number, height: number) {
    this._map = new GameMap(width, height);
    const arena = new Arena(width, height);
    arena.create((y: number, x: number, value: number) => {
      this._map.content[y][x] = (value === 1) ? '#' : '.';
    });
  }

  isWalkable(position: Position): boolean {
    return (this._map.content[position.y][position.x] !== '#');
  }
}
