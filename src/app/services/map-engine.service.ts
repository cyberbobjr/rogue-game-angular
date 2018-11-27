import {Injectable} from '@angular/core';
import {IMapEngine} from '../interfaces/i-map-engine';
import {GameMap} from '../classes/gameMap';
import {Entity} from '../classes/base/entity';
import {IEntity} from '../interfaces/ientity';
import {TilesFactory} from '../factories/tiles-factory';
import {TileType} from '../enums/tile-type.enum';
import PreciseShadowcasting from 'rot-js/lib/fov/precise-shadowcasting';
import {Tile} from '../classes/base/tile';
import {Position} from '../classes/position';
import {Sprite} from '../classes/base/sprite';
import Digger from 'rot-js/lib/map/digger';
import {Room} from 'rot-js/lib/map/features';

@Injectable({
  providedIn: 'root'
})
export class MapEngine implements IMapEngine {
  private _width: number;
  private _height: number;
  private _map: GameMap<IEntity> = null;
  private _preciseShadowcasting: PreciseShadowcasting = null;
  private _mainActor: Entity = null;
  private _rotMap: any;

  get mainActor(): Entity {
    return this._mainActor;
  }

  set mainActor(value: Entity) {
    this._mainActor = value;
  }

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

  generateMap(width: number, height: number): GameMap<IEntity> {
    this._width = width;
    this._height = height;
    this._rotMap = this._createMap(width, height);
    this._createDoor(this._rotMap);
    this._createFovMap();
    return this._map;
  }

  computeFov(position: Position) {
    if (!this._mainActor) {
      return;
    }
    this._resetLightMap();
    const lightRadius: number = this._mainActor.lightRadius;
    const lightPower: number = this._mainActor.ligthPower;
    this._preciseShadowcasting.compute(position.x, position.y, lightRadius, (x: number, y: number, R: number, visibility: number) => {
      try {
        const sprite = <Sprite>this._map.content[y][x].sprite;
        sprite.light = true;
        sprite.visibility = R / lightPower;
      } catch (e) {
      }
    });
  }

  getStartPosition(): Position {
    const rooms: Array<Room> = this._rotMap.getRooms();
    const room: Room = rooms[0];
    const x = room.getLeft() + Math.round((room.getRight() - room.getLeft()) / 2);
    const y = room.getTop() + Math.round((room.getBottom() - room.getTop()) / 2);
    return new Position(x, y);
  }

  private _resetLightMap() {
    for (let j = 0; j < this._map.content.length; j++) {
      for (let i = 0; i < this._map.content[0].length; i++) {
        const sprite = this._map.content[j][i].sprite;
        sprite.light = false;
      }
    }
  }

  private _createMap(width: number, height: number) {
    this._map = new GameMap<Entity>(width, height);
    const rotMap = new Digger(width, height);
    rotMap.create((x: number, y: number, value: number) => {
      this._map.content[y][x] = TilesFactory.createTile((value === 1) ? TileType.WALL : TileType.FLOOR);
    });
    return rotMap;
  }

  private _createDoor(rotMap: Digger) {
    const rooms: Array<Room> = rotMap.getRooms();
    let room: Room = null;
    for (let i = 0; i < rooms.length; i++) {
      room = rooms[i];
      room.getDoors((x: number, y: number) => {
        this._map.content[y][x] = TilesFactory.createTile(TileType.DOOR);
      });
    }
  }

  private _createFovMap() {
    this._preciseShadowcasting = new PreciseShadowcasting((x: number, y: number) => {
      try {
        const info = <Tile>this.map.content[y][x];
        return !info.opaque;
      } catch (e) {
        return false;
      }
    }, {topology: 8});
  }
}
