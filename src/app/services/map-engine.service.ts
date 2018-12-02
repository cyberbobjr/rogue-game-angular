import {Injectable} from '@angular/core';
import {IMapEngine} from '../interfaces/i-map-engine';
import {GameMap} from '../classes/gameMap';
import {Entity} from '../classes/base/entity';
import {IEntity} from '../interfaces/ientity';
import {TilesFactory} from '../factories/tiles-factory';
import {TileType} from '../enums/tile-type.enum';
import {Tile} from '../classes/base/tile';
import {Position} from '../classes/position';
import {Sprite} from '../classes/base/sprite';
import Digger from 'rot-js/lib/map/digger';
import {Room} from 'rot-js/lib/map/features';
import {RNG} from 'rot-js/lib';
import PreciseShadowcasting from 'rot-js/lib/fov/precise-shadowcasting';
import {EntitiesService} from './entities.service';

@Injectable({
  providedIn: 'root'
})
export class MapEngine implements IMapEngine {
  private _width: number;
  private _height: number;
  private _rotEngine: any = null;
  private _gameMap: GameMap<IEntity> = null;
  private _baseMap: GameMap<IEntity> = null;
  private _preciseShadowcasting: PreciseShadowcasting = null;
  private _mainActor: Entity = null;

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

  get baseMap(): GameMap<IEntity> {
    return this._baseMap;
  }

  get gameMap(): GameMap<IEntity> {
    return this._gameMap;
  }

  set gameMap(value: GameMap<IEntity>) {
    this._gameMap = value;
  }

  constructor(private entitiesService: EntitiesService) {
  }

  generateMap(width: number, height: number): GameMap<IEntity> {
    this._width = width;
    this._height = height;
    this._rotEngine = this._createMap(width, height);
    this._createDoor(this._rotEngine);
    this._createFovMap();
    return this._baseMap;
  }

  computeFov(position: Position): GameMap<IEntity> {
    if (!this._mainActor) {
      return;
    }
    this._gameMap = this._putEntitiesOn(this._baseMap.clone());
    this._resetLightMap(this._gameMap);
    const lightRadius: number = this._mainActor.lightRadius;
    const lightPower: number = this._mainActor.ligthPower;
    this._preciseShadowcasting.compute(position.x, position.y, lightRadius, (x: number, y: number, R: number, visibility: number) => {
      try {
        const sprite = <Sprite>this._gameMap.content[y][x].sprite;
        sprite.light = true;
        sprite.visibility = R / lightPower;
      } catch (e) {
      }
    });
    return this._gameMap;
  }

  getStartPosition(): Position {
    const rooms: Array<Room> = this.getRooms();
    const room: Room = rooms[0];
    const x = room.getLeft() + Math.round((room.getRight() - room.getLeft()) / 2);
    const y = room.getTop() + Math.round((room.getBottom() - room.getTop()) / 2);
    return this.getRoomCenter(room);
  }

  getTilesAround(position: Position): Array<Array<IEntity>> {
    const test = (this.gameMap.extract(position.x - 1, position.y - 1, 3, 3));
    return (test).content;
  }

  getTileAt(position: Position): Tile {
    return <Tile>this.gameMap.content[position.y][position.x];
  }

  getRandomPosition(): Position {
    const rooms: Array<Room> = this.getRooms();
    const room: Room = RNG.getItem(rooms);
    return this.getRoomCenter(room);
  }

  getRooms(): Array<Room> {
    return this._rotEngine.getRooms();
  }

  getRoomCenter(room: Room): Position {
    const center: number[] = room.getCenter();
    return new Position(center[0], center[1]);
  }

  private _resetLightMap(gameMap: GameMap<IEntity>) {
    for (let j = 0; j < gameMap.content.length; j++) {
      for (let i = 0; i < gameMap.content[0].length; i++) {
        const sprite = gameMap.content[j][i].sprite;
        sprite.light = false;
      }
    }
  }

  private _createMap(width: number, height: number): any {
    this._baseMap = new GameMap<Entity>(width, height);
    const rotMap = new Digger(width, height);
    rotMap.create((x: number, y: number, value: number) => {
      this._baseMap.content[y][x] = TilesFactory.createTile((value === 1) ? TileType.WALL : TileType.FLOOR, new Position(x, y));
    });
    return rotMap;
  }

  private _createDoor(rotMap: Digger) {
    const rooms: Array<Room> = rotMap.getRooms();
    let room: Room = null;
    for (let i = 0; i < rooms.length; i++) {
      room = rooms[i];
      room.getDoors((x: number, y: number) => {
        this._baseMap.content[y][x] = TilesFactory.createTile(TileType.DOOR, new Position(x, y));
      });
    }
  }

  private _createFovMap() {
    this._preciseShadowcasting = new PreciseShadowcasting((x: number, y: number) => {
      try {
        const info = <Tile>this.gameMap.content[y][x];
        return !info.opaque;
      } catch (e) {
        return false;
      }
    }, {topology: 8});
  }

  private _putEntitiesOn(gameMap: GameMap<IEntity>): GameMap<IEntity> {
    for (const actor of this.entitiesService.entities) {
      gameMap.content[actor.position.y][actor.position.x] = actor;
    }
    return gameMap;
  }
}
