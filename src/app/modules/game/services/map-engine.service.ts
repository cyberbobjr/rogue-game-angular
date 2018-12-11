import {Injectable} from '@angular/core';
import {IMapEngine} from '../../../core/interfaces/i-map-engine';
import {GameMap} from '../../../core/classes/base/gameMap';
import {Entity} from '../../../core/classes/base/entity';
import {TilesFactory} from '../../../core/factories/tiles-factory';
import {TileType} from '../../../core/enums/tile-type.enum';
import {Tile} from '../../../core/classes/base/tile';
import {Position} from '../../../core/classes/base/position';
import {Sprite} from '../../../core/classes/base/sprite';
import {EntitiesService} from './entities.service';
import {IObject} from '../../../core/interfaces/IObject';
import {Path, RNG} from 'rot-js/lib';
import AStar from 'rot-js/lib/path/astar';
import PreciseShadowcasting from 'rot-js/lib/fov/precise-shadowcasting';
import Digger from 'rot-js/lib/map/digger';
import {Room} from 'rot-js/lib/map/features';

@Injectable({
              providedIn: 'root'
            })
export class MapEngine implements IMapEngine {
  private _width: number;
  private _height: number;
  private _rotEngine: Digger = null;
  private _gameMap: GameMap<IObject> = null;
  private _map: GameMap<IObject> = null;
  private _preciseShadowcasting: PreciseShadowcasting = null;
  private _mainActor: Entity = null;
  private _seed: number;

  get seed(): number {
    return this._seed;
  }

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

  get map(): GameMap<IObject> {
    return this._map;
  }

  set map(gameMap: GameMap<IObject>) {
    this._map = gameMap;
  }

  get gameMap(): GameMap<IObject> {
    return this._gameMap;
  }

  get rotEngine(): Digger {
    return this._rotEngine;
  }

  set rotEngine(mapGen: Digger) {
    this._rotEngine = mapGen;
  }

  set gameMap(value: GameMap<IObject>) {
    this._gameMap = value;
  }

  constructor(private _entitiesService: EntitiesService) {
  }

  generateMap(width: number, height: number, seed = 511): GameMap<IObject> {
    this._seed = seed;
    this._width = width;
    this._height = height;
    this._createMap(width, height);
    this._createDoor(this._rotEngine);
    this._createFovCasting();
    return this._map;
  }

  loadMap() {
    this._createFovCasting();
  }

  computeFov(position: Position): GameMap<IObject> {
    if (!this._mainActor) {
      return;
    }
    this._gameMap = this._putEntitiesOn(this._map.clone());
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

  getTilesAround(position: Position): Array<Array<IObject>> {
    const test = (this.gameMap.extract(position.x - 1, position.y - 1, 3, 3));
    return (test).content;
  }

  getTileOrEntityAt(position: Position): IObject {
    const monster: IObject = this._entitiesService.getEntityAt(position);
    if (monster) {
      return monster;
    }
    return <IObject>this._map.content[position.y][position.x];
  }

  getTileAt(position: Position): IObject {
    return <IObject>this._map.content[position.y][position.x];
  }

  setTileAt(position: Position, tile: Tile) {
    this._map.content[position.y][position.x] = tile;
    tile.position = position;
  }

  getRooms(): Array<Room> {
    return this._rotEngine.getRooms();
  }

  getRoomCenter(room: Room): Position {
    const center: number[] = room.getCenter();
    return new Position(center[0], center[1]);
  }

  getDirectionToPlayer(originPosition: Position): Position | null {
    const player: Entity = this._entitiesService.player;
    const astar: AStar = new Path.AStar(player.position.x, player.position.y, (x: number, y: number) => {
      const info: IObject = this.getTileOrEntityAt(new Position(x, y));
      if (info instanceof Entity) {
        return true;
      }
      if (info instanceof Tile) {
        return info.isWalkable();
      }
      return false;
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

  private _resetLightMap(gameMap: GameMap<IObject>) {
    for (let j = 0; j < gameMap.content.length; j++) {
      for (let i = 0; i < gameMap.content[0].length; i++) {
        const sprite = gameMap.content[j][i].sprite;
        if (sprite) {
          sprite.light = false;
        }
      }
    }
  }

  private _createMap(width: number, height: number) {
    RNG.setSeed(this._seed);
    this._map = new GameMap<Entity>(width, height);
    const rotMap: Digger = new Digger(width, height);
    rotMap.create((x: number, y: number, value: number) => {
      const tile: Tile = TilesFactory.createTile((value === 1) ? TileType.WALL : TileType.FLOOR);
      this.setTileAt(new Position(x, y), tile);
    });
    this._rotEngine = rotMap;
  }

  private _createDoor(rotMap: Digger) {
    const rooms: Array<Room> = rotMap.getRooms();
    let room: Room = null;
    for (let i = 0; i < rooms.length; i++) {
      room = rooms[i];
      room.getDoors((x: number, y: number) => {
        const tile: Tile = TilesFactory.createTile(TileType.DOOR);
        this.setTileAt(new Position(x, y), tile);
      });
    }
  }

  private _createFovCasting() {
    this._preciseShadowcasting = new PreciseShadowcasting((x: number, y: number) => {
      try {
        const info = <Tile>this.gameMap.content[y][x];
        return !info.opaque;
      } catch (e) {
        return false;
      }
    }, {topology: 8});
  }

  private _putEntitiesOn(gameMap: GameMap<IObject>): GameMap<IObject> {
    for (const actor of this._entitiesService.entities) {
      const position: Position = (actor as Entity).position;
      gameMap.content[position.y][position.x] = actor;
    }
    return gameMap;
  }
}
