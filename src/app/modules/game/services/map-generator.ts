import {Injectable} from '@angular/core';
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
import {GameMap} from 'src/app/core/classes/base/gameMap';
import {Iobject} from 'src/app/core/interfaces/iobject';
import {Room} from 'rot-js/lib/map/features';
import {RNG} from 'rot-js';
import Digger from 'rot-js/lib/map/digger';
import {EntitiesService} from './entities.service';
import {Config} from '../../../core/config';
import {Utility} from '../../../core/classes/utility';
import {FloorTile} from '../../../core/classes/tiles/floor-tile';
import {ChestTile} from '../../../core/classes/tiles/chest-tile';

@Injectable({
              providedIn: 'root'
            })
export class MapGenerator {
  private _rotEngine: Digger;

  constructor(private _entitiesService: EntitiesService) {

  }

  generateNewMap(level = 1): GameMap {
    const width = 80;
    const height = 80;
    const map: GameMap = this._generateMap(width, height, Math.round(Math.random() * 100), level);
    this._entitiesService.entities = this._generateMonsters([0]);
    this._generateChests(map);
    return map;
  }

  loadMap(jsonData: { map: JsonMap, _entities: Array<JsonEntity> }): GameMap | null {
    if (jsonData) {
      const map: GameMap = this._generateMap(jsonData.map._width, jsonData.map._height, jsonData.map._seed);
      this._loadTiles(map, jsonData.map);
      this._entitiesService.loadEntitiesFromJson(jsonData._entities);
      return map;
    }
    return null;
  }

  private _generateChests(map: GameMap) {
    const maxChests: number = Utility.rolldice(Config.maxLevel - map.level + 1);
    for (let chest = 0; chest < maxChests; chest++) {
      const chestPosition: Position = this._getFreeSlotForRoom(map, Utility.rolldice(this._getRooms().length - 1));
      if (chestPosition) {
        const chestTile: Tile = TilesFactory.createTile(TileType.CHEST);
        map.setDataAt(chestPosition.x, chestPosition.y, chestTile);
        const chestObjects: Array<GameObject> = GameObjectFactory.generateRandomObjects(3);
        chestObjects.forEach((gameObject: GameObject) => {
          chestTile.dropOn(gameObject);
        });
      }
    }
  }

  private _getFreeSlotForRoom(map: GameMap, roomNumber: number): Position | null {
    let validPosition = false;
    let randomPosition: Position = null;
    let randomX: number;
    let randomY: number;
    let tile: Tile = null;
    let tryCount = 0;
    const roomPosition: [Position, Position] = this._getRoomPosition(roomNumber); // topleft, bottomright
    while (!validPosition || tryCount < 10) {
      randomX = Utility.getRandomInt(roomPosition[0].x, roomPosition[1].x);
      randomY = Utility.getRandomInt(roomPosition[0].y, roomPosition[1].y);
      randomPosition = new Position(randomX, randomY);
      tile = map.getTileAt(randomPosition);
      validPosition = (tile instanceof FloorTile);
      tryCount++;
    }
    return randomPosition;
  }

  private _getRoomPosition(roomNumber: number): [Position, Position] {
    const room: Room = this._rotEngine.getRooms()[roomNumber];
    const topleft: Position = new Position(room.getLeft(), room.getTop());
    const bottomright: Position = new Position(room.getRight(), room.getBottom());
    return [topleft, bottomright];
  }

  private _loadTiles(map: GameMap, mapJson: JsonMap) {
    mapJson._data.forEach((cells: Array<JSonCell>) => {
      cells.forEach((cell: JSonCell) => {
        try {
          const tile: Tile = TilesFactory.createJsonTile(<TileType>cell.type, cell);
          this._loadTileContents(tile, cell.contents);
          if (!cell.position) {
            debugger;
          }
          map.setDataAt(cell.position._x, cell.position._y, tile);
        } catch (e) {
          console.log(e);
        }
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

  private _getRooms(): Array<Room> {
    return this._rotEngine.getRooms();
  }

  private _getRoomCenter(room: Room): Position {
    const center: number[] = room.getCenter();
    return new Position(center[0], center[1]);
  }

  private _generateMap(width: number, height: number, seed = 511, level = 1): GameMap {
    const map: GameMap = this._createMap(width, height, seed, level);
    this._createDoor(map, this._rotEngine);
    this._generateEntryPoint(map, this._rotEngine);
    this._generateExitPoint(map, this._rotEngine);
    return map;
  }

  private _generateMonsters(excludeRooms: Array<number> = []): Array<Entity> {
    const monsters: Array<Entity> = [];
    const rooms: Array<Room> = this._getRooms();
    const nbRooms: number = rooms.length;
    EntitiesFactory.getInstance()
                   .setMaxPop(nbRooms);
    for (let nb = 1; nb < nbRooms - 2; nb++) {
      if (excludeRooms.indexOf(nb) !== 0) {
        const entity: Entity = EntitiesFactory.getInstance()
                                              .generateRandomEntities(this._getRoomCenter(rooms[nb]));
        entity.setNextAction(new IdleAction(entity));
        monsters.push(entity);
      }
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
