import {Injectable} from '@angular/core';
import {IMapEngine} from '../interfaces/i-map-engine';
import Arena from 'rot-js/lib/map/arena';
import {Position} from '../classes/position';
import Digger from 'rot-js/lib/map/digger';

@Injectable({
              providedIn: 'root'
            })
export class MapEngine implements IMapEngine {
  width = 10;
  height = 10;
  map: string[][] = [];

  constructor() {
  }

  generateNewMap(width: number, height: number): Array<Array<string>> {
    this.width = width;
    this.height = height;
    this._initMapArray(width, height);
    this._createMap(width, height);
    return this.map;
  }

  private _createMap(width: number, height: number) {
    const arena = new Digger(width, height);
    arena.create((y: number, x: number, value: number) => {
      this.map[y][x] = (value === 1) ? '#' : '.';
    });
  }

  private _initMapArray(width: number, height: number) {
    this.map = new Array(height);
    this.map.fill(['.']);
    this.map.forEach((value: any, index: number) => {
      this.map[index] = new Array(width).fill('/');
    });
  }

  isWalkable(position: Position): boolean {
    return (this.map[position.y][position.x] !== '#');
  }
}
