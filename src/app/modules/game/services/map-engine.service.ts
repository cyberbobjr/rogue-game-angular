import {Injectable} from '@angular/core';
import {IMapEngine} from '../../../core/interfaces/i-map-engine';
import {GameMap} from '../../../core/classes/base/gameMap';
import {Entity} from '../../../core/classes/base/entity';
import {TilesFactory} from '../../../core/factories/tiles-factory';
import {TileType} from '../../../core/enums/tile-type.enum';
import {Tile} from '../../../core/classes/base/tile';
import {Position} from '../../../core/classes/base/position';
import {EntitiesService} from './entities.service';
import {Iobject} from '../../../core/interfaces/iobject';
import {Path, RNG} from 'rot-js/lib';
import AStar from 'rot-js/lib/path/astar';
import PreciseShadowcasting from 'rot-js/lib/fov/precise-shadowcasting';
import Digger from 'rot-js/lib/map/digger';
import {Room} from 'rot-js/lib/map/features';
import {Monster} from '../../../core/classes/entities/monster';
import {EntitiesFactory} from '../../../core/factories/entities-factory';
import {EntityType} from '../../../core/enums/entity-type.enum';
import {IdleAction} from '../../../core/classes/actions/idle-action';
import {Sprite} from '../../../core/classes/base/sprite';

@Injectable({
              providedIn: 'root'
            })
export class MapEngine implements IMapEngine {
  private _width: number;
  private _height: number;
  private _rotEngine: Digger = null;
  private _gameMap: GameMap<Iobject> = null;
  private _map: GameMap<Iobject> = null;
  private _preciseShadowcasting: PreciseShadowcasting = null;
  private _entitiesVisibles: Array<Entity> = [];

  get entitiesVisibles(): Array<Entity> {
    return this._entitiesVisibles;
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

  get map(): GameMap<Iobject> {
    return this._map;
  }

  set map(gameMap: GameMap<Iobject>) {
    this._map = gameMap;
  }

  get gameMap(): GameMap<Iobject> {
    return this._gameMap;
  }

  get rotEngine(): Digger {
    return this._rotEngine;
  }

  set rotEngine(mapGen: Digger) {
    this._rotEngine = mapGen;
  }

  set gameMap(value: GameMap<Iobject>) {
    this._gameMap = value;
  }

  constructor(private _entitiesService: EntitiesService) {
  }

  generateMap(width: number, height: number, seed = 511, level = 1): GameMap<Iobject> {
    this._width = width;
    this._height = height;
    this._createMap(width, height, seed, level);
    this._createDoor(this._rotEngine);
    this._createFovCasting();
    return this._map;
  }

  generateMonsters(excludeRooms: Array<number> = []): Array<Entity> {
    const monsters: Array<Entity> = [];
    const rooms: Array<Room> = this.getRooms();
    const nbRooms: number = rooms.length;
    EntitiesFactory.getInstance()
                   .setMaxPop(nbRooms);
    for (let nb = 1; nb < nbRooms - 2; nb++) {
      if (excludeRooms.indexOf(nb) !== 0) {
        const entity: Entity = EntitiesFactory.getInstance()
                                              .generateRandomEntities(this.getRoomCenter(rooms[nb]));
        entity.setNextAction(new IdleAction(entity, this));
        monsters.push(entity);
      }
    }
    return monsters;
  }

  computeFOV(position: Position): GameMap<Iobject> {
    const mainActor: Entity = this._entitiesService.player;
    if (!mainActor) {
      return;
    }
    const lightRadius: number = mainActor.lightRadius;
    const lightPower: number = mainActor.ligthPower;
    this._gameMap = this._putEntitiesOn(this._map.clone());
    this._resetLightMap(this._gameMap);
    this._entitiesVisibles.splice(0);
    this._preciseShadowcasting.compute(position.x, position.y, lightRadius, (x: number, y: number, R: number, visibility: number) => {
      try {
        const tile: Iobject = <Iobject>this._gameMap.getDataAt(x, y);
        const sprite = tile.sprite;
        sprite.light = true;
        sprite.visibility = R / lightPower;
        if (tile instanceof Monster && sprite.visibility > 0) {
          this._entitiesVisibles.push(<Entity>this._gameMap.getDataAt(x, y));
        }
      } catch (e) {
      }
    });
    return this._gameMap;
  }

  getStartPosition(): Position {
    const rooms: Array<Room> = this.getRooms();
    const room: Room = rooms[0];
    return this.getRoomCenter(room);
  }

  getTilesAround(position: Position): Array<Array<Iobject>> {
    const test: GameMap<Iobject> = this.gameMap.extract(position.x - 1, position.y - 1, 3, 3);
    return test.content;
  }

  getTileOrEntityAt(position: Position): Iobject {
    const monster: Iobject = this._entitiesService.getEntityAt(position);
    if (monster) {
      return monster;
    }
    return <Iobject>this._map.getDataAt(position.x, position.y);
  }

  getTileAt(position: Position): Tile {
    return <Tile>this._map.getDataAt(position.x, position.y);
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
      const info: Iobject = this.getTileOrEntityAt(new Position(x, y));
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

  private _resetLightMap(gameMap: GameMap<Iobject>) {
    for (let j = 0; j < gameMap.height; j++) {
      for (let i = 0; i < gameMap.width; i++) {
        const sprite: Sprite = <Sprite>gameMap.getDataAt(i, j).sprite;
        if (sprite) {
          sprite.light = false;
        }
      }
    }
  }

  private _createMap(width: number, height: number, seed: number, level: number) {
    RNG.setSeed(seed);
    this._map = new GameMap<Entity>(width, height).setSeed(seed)
                                                  .setLevel(level);
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
        const info = <Tile>this.gameMap.getDataAt(x, y);
        return !info.opaque;
      } catch (e) {
        return false;
      }
    }, {topology: 8});
  }

  private _putEntitiesOn(gameMap: GameMap<Iobject>): GameMap<Iobject> {
    for (const actor of this._entitiesService.entities) {
      const position: Position = (actor as Entity).position;
      gameMap.content[position.y][position.x] = actor;
    }
    return gameMap;
  }
}
