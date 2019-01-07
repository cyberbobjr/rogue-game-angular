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

@Injectable({
              providedIn: 'root'
            })
export class MapGenerator {
  private _rotEngine: Digger;

  constructor() {

  }

  generateNewMap(level = 1): GameMap<Iobject> {
    const width = 80;
    const height = 80;
    const map: GameMap<Iobject> = this._generateMap(width, height, Math.round(Math.random() * 100), level);
    map.entities = this._generateMonsters([0]);
    return map;
  }

  loadMap(jsonData: { map: JsonMap, _entities: Array<JsonEntity> }): GameMap<Iobject> | null {
    if (jsonData) {
      const map: GameMap<Iobject> = this._generateMap(jsonData.map._width, jsonData.map._height, jsonData.map._seed);
      this._loadTiles(map, jsonData.map);
      this._loadEntities(map, jsonData._entities);
      return map;
    }
    return null;
  }

  private _loadEntities(map: GameMap<Iobject>, entities: Array<JsonEntity>): void {
    const monsters: Array<Entity> = [];
    entities.forEach((entity: JsonEntity) => {
      const monster: Entity = EntitiesFactory.createFromJson(entity);
      monster.setNextAction(new IdleAction(monster));
      monsters.push(monster);
    });
    map.entities = monsters;
  }

  private _loadTiles(map: GameMap<Iobject>, mapJson: JsonMap) {
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

  private _generateMap(width: number, height: number, seed = 511, level = 1): GameMap<Iobject> {
    const map: GameMap<Iobject> = this._createMap(width, height, seed, level);
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

  private _createMap(width: number, height: number, seed: number, level: number): GameMap<Iobject> {
    RNG.setSeed(seed);
    const map: GameMap<Iobject> = new GameMap<Iobject>(width, height).setSeed(seed)
                                                                     .setLevel(level);
    this._rotEngine = new Digger(width, height);
    this._rotEngine.create((x: number, y: number, value: number) => {
      const tile: Tile = TilesFactory.createTile((value === 1) ? TileType.WALL : TileType.FLOOR, new Position(x, y));
      map.setDataAt(x, y, tile);
    });
    return map;
  }

  private _generateExitPoint(map: GameMap<Iobject>, rotMap: Digger) {
    const rooms: Array<Room> = rotMap.getRooms();
    const lastRoom: Room = rooms[rooms.length - 1];
    const center: number[] = lastRoom.getCenter();
    map.exitPosition = new Position(center[0], center[1]);
    const tile: Tile = TilesFactory.createTile(TileType.STAIRDOWN, map.exitPosition);
    map.setDataAt(center[0], center[1], tile);
  }

  private _generateEntryPoint(map: GameMap<Iobject>, rotMap: Digger) {
    const rooms: Array<Room> = rotMap.getRooms();
    const firstRoom: Room = rooms[0];
    const center: number[] = firstRoom.getCenter();
    map.entryPosition = new Position(center[0], center[1]);
    const tile: Tile = TilesFactory.createTile(TileType.STAIRUP, map.entryPosition);
    map.setDataAt(center[0], center[1], tile);
  }

  private _createDoor(map: GameMap<Iobject>, rotMap: Digger) {
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
