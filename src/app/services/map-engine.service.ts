import {Injectable} from '@angular/core';
import {IMapEngine} from '../interfaces/i-map-engine';
import Arena from 'rot-js/lib/map/arena';
import {GameMap} from '../classes/gameMap';
import {Entity} from '../classes/base/entity';
import {IEntity} from '../interfaces/ientity';
import {TilesFactory} from '../factories/tiles-factory';
import {TileType} from '../enums/tile-type.enum';
import PreciseShadowcasting from 'rot-js/lib/fov/precise-shadowcasting';
import {Tile} from '../classes/base/tile';
import {Position} from '../classes/position';
import Cellular from 'rot-js/lib/map/cellular';
import {Sprite} from '../classes/base/sprite';
import {FOV} from 'rot-js/lib';

@Injectable({
              providedIn: 'root'
            })
export class MapEngine implements IMapEngine {
  private _width: number;
  private _height: number;
  private _map: GameMap<IEntity> = null;
  private preciseShadowcasting: PreciseShadowcasting = null;

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

  get map(): GameMap<IEntity> {
    return this._map;
  }

  set map(value: GameMap<IEntity>) {
    this._map = value;
  }

  constructor() {
  }

  generateNewMap(width: number, height: number): GameMap<IEntity> {
    this._width = width;
    this._height = height;
    this._createMap(width, height);
    this._createFovMap();
    return this._map;
  }

  resetLightMap() {
    for (let j = 0; j < this._map.content.length; j++) {
      for (let i = 0; i < this._map.content[0].length; i++) {
        const sprite = this._map.content[j][i].sprite;
        sprite.light = false;
      }
    }
  }

  private _createMap(width: number, height: number) {
    this._map = new GameMap<Entity>(width, height);
    const arena = new Cellular(width, height);
    arena.randomize(0.5);
    arena.create((y: number, x: number, value: number) => {
      this._map.content[y][x] = TilesFactory.createTile((value === 1) ? TileType.WALL : TileType.FLOOR);
    });
  }

  private _createFovMap() {
    this.preciseShadowcasting = new FOV.PreciseShadowcasting((x: number, y: number) => {
      try {
        const info = <Tile>this.map.content[y][x];
        return !info.opaque;
      } catch (e) {
        return false;
      }
    }, {topology: 8});
  }

  computeFov(position: Position) {
    this.preciseShadowcasting.compute(position.x, position.y, 5, (x: number, y: number, R: number, visibility) => {
      try {
        const sprite = <Sprite>this._map.content[y][x].sprite;
        sprite.light = true;
      } catch (e) {
      }
    });
  }
}
