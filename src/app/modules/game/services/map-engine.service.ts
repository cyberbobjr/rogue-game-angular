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
import {IdleAction} from '../../../core/classes/actions/idle-action';
import {Sprite} from '../../../core/classes/base/sprite';
import {DoorTile} from '../../../core/classes/tiles/door-tile';
import {JSonCell, JsonEntity, JsonMap} from 'src/app/core/interfaces/json-interfaces';
import {GameObject} from 'src/app/core/classes/gameObjects/game-object';
import {GameObjectFactory} from 'src/app/core/factories/game-object-factory';
import {Player} from 'src/app/core/classes/entities/player';

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

  maxLevel = 21;

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

  loadMap(jsonData: { map: JsonMap, _entities: Array<JsonEntity> }) {
    if (jsonData) {
      this.generateMap(jsonData.map._width, jsonData.map._height, jsonData.map._seed);
      this._createTiles(jsonData.map);
      this._loadEntities(jsonData._entities);
      return true;
    }
    return false;
  }

  private _loadEntities(entities: Array<JsonEntity>): void {
    const monsters: Array<Entity> = [];
    entities.forEach((entity: JsonEntity) => {
      const monster: Entity = EntitiesFactory.createFromJson(entity);
      monster.setNextAction(new IdleAction(monster));
      monsters.push(monster);
    });
    this._entitiesService.entities = monsters;
  }

  private _createTiles(mapJson: JsonMap) {
    mapJson._data.forEach((cells: Array<JSonCell>) => {
      cells.forEach((cell: JSonCell) => {
        const position: Position = new Position(cell.position._x, cell.position._y);
        const tile: Tile = TilesFactory.createJsonTile(<TileType>cell.type, cell);
        this._loadTileContents(tile, cell.contents);
        this.setTileAt(position, tile);
      });
    });
  }

  private _loadTileContents(tile: Tile, jsonContent: Array<any>) {
    jsonContent.forEach((content: any) => {
      const gameObject: GameObject = GameObjectFactory.createFromJson(content.objectType, content);
      if (gameObject) {
        tile.dropOn(gameObject);
      }
    });
  }

  generateNewMap(level = 1, player: Player): GameMap<Iobject> {
    const gameMap: GameMap<Iobject> = this.generateMap(80, 80, Math.round(Math.random() * 100), level);
    this._entitiesService.entities = this.generateMonsters([0]);
    player.position = this.getStartPosition();
    player.level = level;
    this._entitiesService.player = player;
    return gameMap;
  }

  generateMap(width: number, height: number, seed = 511, level = 1): GameMap<Iobject> {
    this._width = width;
    this._height = height;
    this._createMap(width, height, seed, level);
    this._createDoor(this._rotEngine);
    this._generateNextLevelAccess(this._rotEngine);
    if (level !== 1) {
      this._generatePreviousLevelAccess(this._rotEngine);
    }
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
        entity.setNextAction(new IdleAction(entity));
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

  private _generateNextLevelAccess(rotMap: Digger) {
    const rooms: Array<Room> = rotMap.getRooms();
    const lastRoom: Room = rooms[rooms.length - 1];
    const tile: Tile = TilesFactory.createTile(TileType.STAIRDOWN);
    const center: number[] = lastRoom.getCenter();
    this.setTileAt(new Position(center[0], center[1]), tile);
  }

  private _generatePreviousLevelAccess(rotMap: Digger) {
    const rooms: Array<Room> = rotMap.getRooms();
    const firstRoom: Room = rooms[0];
    const tile: Tile = TilesFactory.createTile(TileType.STAIRUP);
    const center: number[] = firstRoom.getCenter();
    this.setTileAt(new Position(center[0], center[1]), tile);
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
