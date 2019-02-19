import {JSonCell, JsonEntity, JsonMap} from 'src/app/core/interfaces/json-interfaces';
import {Entity} from 'src/app/core/classes/base/entity';
import {EntitiesFactory} from 'src/app/core/factories/entities-factory';
import {IdleAction} from 'src/app/core/classes/actions/idle-action';
import {Position} from 'src/app/core/classes/base/position';
import {Tile} from 'src/app/core/classes/base/tile';
import {TilesFactory} from 'src/app/core/factories/tiles-factory';
import {TileType} from 'src/app/core/enums/tile-type.enum';
import {GameObject} from 'src/app/core/classes/gameObjects/game-object';
import {GameObjectFactory} from 'src/app/core/factories/game-object-factory';
import {GameMap} from 'src/app/core/classes/base/game-map';
import {Room} from 'rot-js/lib/map/features';
import {RNG} from 'rot-js';
import Digger from 'rot-js/lib/map/digger';
import {Utility} from '../classes/utility';
import {FloorTile} from '../classes/tiles/floor-tile';

export class MapBuilder {
  private _rotEngine: Digger;
  private _seed = Math.round(Math.random() * 100);
  private _height = 80;
  private _width = 80;
  private _level = 1;
  private _jsonMap: JsonMap = null;
  private _entities: Array<Entity> = [];
  private _maxChests = 0;
  private _maxEntities = 0;

  static fromJSON(jsonMap: JsonMap): GameMap {
    if (!jsonMap) {
      throw new Error('jsonData map is empty');
    }
    const mapBuilder: MapBuilder = new MapBuilder().withTile(jsonMap)
                                                   .withSeed(jsonMap._seed)
                                                   .withLevel(jsonMap._level);
    return mapBuilder.build();
  }

  constructor() {
  }

  withSeed(seed: number): MapBuilder {
    this._seed = seed;
    return this;
  }

  withSize(width: number, height: number): MapBuilder {
    this._width = width;
    this._height = height;
    return this;
  }

  withRandomEntities(maxEntities: number): MapBuilder {
    this._maxEntities = maxEntities;
    return this;
  }

  withEntities(entities: Array<Entity>): MapBuilder {
    this._entities = entities;
    return this;
  }

  withRandomChests(maxChests: number): MapBuilder {
    this._maxChests = maxChests;
    return this;
  }

  withTile(jsonMap: JsonMap): MapBuilder {
    this._jsonMap = jsonMap;
    return this;
  }

  withLevel(level: number): MapBuilder {
    this._level = level;
    return this;
  }

  build(): GameMap {
    const gameMap: GameMap = this._generateMap(this._width, this._height, this._seed, this._level);
    if (this._jsonMap) {
      this._generateFromJson(gameMap);
    }
    if (this._maxEntities > 0) {
      gameMap.entities = this._generateMonsters([0], this._maxEntities, gameMap);
    }
    if (this._maxChests > 0) {
      this._generateChests(gameMap, this._maxChests);
    }
    return gameMap;
  }

  private _generateFromJson(gameMap: GameMap) {
    this._jsonMap._data.forEach((cells: Array<JSonCell>) => {
      cells.forEach((cell: JSonCell) => {
        try {
          const tile: Tile = TilesFactory.createJsonTile(<TileType>cell.type, cell);
          this._loadTileContents(tile, cell.contents);
          if (!cell.position) {
            throw new Error('Tile withouh position');
          }
          gameMap.setDataAt(cell.position.x, cell.position.y, tile);
        } catch (e) {
          console.log(e);
          console.trace();
        }
      });
    });
  }

  private _generateChests(map: GameMap, maxChests: number) {
    for (let chest = 0; chest < maxChests; chest++) {
      const chestPosition: Position = map.getFreeSlotForRoom(Utility.rolldice(this._rotEngine.getRooms().length - 1));
      if (chestPosition) {
        const chestTile: Tile = TilesFactory.createTile(TileType.CHEST);
        map.setDataAt(chestPosition.x, chestPosition.y, chestTile);
      }
    }
  }

  private _loadTileContents(tile: Tile, jsonContent: Array<any>) {
    jsonContent.forEach((content: any) => {
      const gameObject: GameObject = GameObjectFactory.createFromJson(content.objectType, content);
      if (gameObject) {
        tile.dropOn(gameObject);
      }
    });
  }

  private _generateMap(width: number, height: number, seed = 511, level = 1): GameMap {
    const map: GameMap = this._createMap(width, height, seed, level);
    this._createDoor(map, this._rotEngine);
    this._generateEntryPoint(map, this._rotEngine);
    this._generateExitPoint(map, this._rotEngine);
    map.rooms = this._rotEngine.getRooms();
    return map;
  }

  private _generateMonsters(excludeRooms: Array<number> = [], maxEntities: number, map: GameMap): Array<Entity> {
    const monsters: Array<Entity> = [];
    const rooms: Array<Room> = this._rotEngine.getRooms();
    const nbRooms: number = rooms.length;
    let roomNumber = 0;
    EntitiesFactory.getInstance()
                   .setMaxPop(maxEntities);
    for (let nb = 0; nb < maxEntities; nb++) {
      do {
        roomNumber = Utility.rolldice(nbRooms - 1);
      } while (excludeRooms.indexOf(roomNumber) !== 0);

      const entityPosition: Position = map.getFreeSlotForRoom(roomNumber);
      const entity: Entity = EntitiesFactory.generateRandomEntities(entityPosition);
      entity.setNextAction(new IdleAction());
      monsters.push(entity);
    }
    return monsters;
  }

  private _createMap(width: number, height: number, seed: number, level: number): GameMap {
    RNG.setSeed(seed);
    const map: GameMap = new GameMap(width, height).setSeed(seed)
                                                   .setLevel(level);
    this._rotEngine = new Digger(width, height);
    this._rotEngine.create((x: number, y: number, value: number) => {
      const tile: Tile = TilesFactory.createTile((value === 1) ? TileType.WALL : TileType.FLOOR, new Position(x, y));
      map.setDataAt(x, y, tile);
    });
    return map;
  }

  private _generateExitPoint(map: GameMap, rotMap: Digger) {
    const rooms: Array<Room> = rotMap.getRooms();
    const lastRoom: Room = rooms[0];
    const center: number[] = lastRoom.getCenter();
    map.exitPosition = new Position(center[0], center[1]);
    const tile: Tile = TilesFactory.createTile(TileType.STAIRUP, map.exitPosition);
    map.setDataAt(center[0], center[1], tile);
  }

  private _generateEntryPoint(map: GameMap, rotMap: Digger) {
    const rooms: Array<Room> = rotMap.getRooms();
    const firstRoom: Room = rooms[rooms.length - 1];
    const center: number[] = firstRoom.getCenter();
    map.entryPosition = new Position(center[0], center[1]);
    const tile: Tile = TilesFactory.createTile(TileType.STAIRDOWN, map.entryPosition);
    map.setDataAt(center[0], center[1], tile);
  }

  private _createDoor(map: GameMap, rotMap: Digger) {
    const rooms: Array<Room> = rotMap.getRooms();
    let room: Room = null;
    for (let i = 0; i < rooms.length; i++) {
      room = rooms[i];
      room.getDoors((x: number, y: number) => {
        const tile: Tile = TilesFactory.createTile(TileType.DOOR, new Position(x, y));
        map.setDataAt(x, y, tile);
      });
    }
  }
}
