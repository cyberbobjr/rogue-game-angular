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
  width: number;
  height: number;
  map: GameMap = null;

  constructor() {
  }

  generateNewMap(width: number, height: number): GameMap {
    this.width = width;
    this.height = height;
    this._createMap(width, height);
    return this.map;
  }

  private _createMap(width: number, height: number) {
    this.map = new GameMap(width, height);
    const arena = new Arena(width, height);
    arena.create((y: number, x: number, value: number) => {
      this.map.content[y][x] = (value === 1) ? '#' : '.';
    });
  }

  isWalkable(position: Position): boolean {
    return (this.map.content[position.y][position.x] !== '#');
  }
}
