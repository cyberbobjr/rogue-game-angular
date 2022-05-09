import {Room} from 'rot-js/lib/map/features';
import {RNG} from 'rot-js';
import Digger from 'rot-js/lib/map/digger';
import {Utility} from '../core/Utility/utility';
import {GameMapImp} from '../core/base/game-map-imp';
import {GameObjectFactory} from '../factories/game-object-factory';
import {Position2D} from '../core/base/position2D';
import {GameObject} from '../core/gameObjects/game-object';
import {TilesFactory} from '../factories/tiles-factory';
import {TileType} from '../enums/tile-type.enum';
import {JSonCell, JsonMap} from '../interfaces/json-interfaces';
import {Tile} from '../core/base/tile';
import {GameMap} from '../interfaces/GameMap';

export class MapBuilder {
    private _rotEngine: Digger;
    private _seed = Math.round(Math.random() * 100);
    private _height = 80;
    private _width = 80;
    private _level = 1;
    private _jsonMap: JsonMap = null;
    private _maxChests = 0;

    static generateMaps(nbOfMaps: number = 42): Array<GameMap> {
        const maps: Array<GameMapImp> = [];
        for (let level = 1; level < nbOfMaps + 1; level++) {
            maps.push(new MapBuilder().withLevel(level)
                                      .withSeed(Utility.rolldice(level * 100))
                                      .withRandomChests(nbOfMaps - level)
                                      .build());
        }
        return maps;
    }

    static fromJSON(map: JsonMap): GameMapImp {
        if (!map) {
            throw new Error('jsonData map is empty');
        }
        const mapBuilder: MapBuilder = new MapBuilder().withTile(map)
                                                       .withSeed(map._seed)
                                                       .withLevel(map._level);
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

    build(): GameMapImp {
        const gameMap: GameMapImp = this._generateMap(this._width, this._height, this._seed, this._level);
        if (this._jsonMap) {
            this._generateFromJson(gameMap);
        }
        if (this._maxChests > 0) {
            this._generateChests(gameMap, this._maxChests);
        }
        return gameMap;
    }

    private _generateFromJson(gameMap: GameMapImp) {
        this._jsonMap._data.forEach((cells: Array<JSonCell>) => {
            cells.forEach((cell: JSonCell) => {
                try {
                    const tile: Tile = TilesFactory.createJsonTile(<TileType>cell.type, cell);
                    this._loadTileContents(tile, cell.contents);
                    if (!cell.position) {
                        throw new Error('Tile withouh position');
                    }
                    tile.position = new Position2D(cell.position.x, cell.position.y);
                    gameMap.setTile(tile);
                } catch (e) {
                    console.log(e);
                    console.trace();
                }
            });
        });
    }

    private _generateChests(map: GameMapImp, maxChests: number) {
        for (let chest = 0; chest < maxChests; chest++) {
            const chestPosition: Position2D = map.getFreePositionForRoom(Utility.rolldice(map.rooms.length - 1));
            if (chestPosition) {
                const chestTile: Tile = TilesFactory.createTile(TileType.CHEST);
                chestTile.position = new Position2D(chestPosition.x, chestPosition.y);
                map.setTile(chestTile);
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

    private _generateMap(width: number, height: number, seed = 511, level = 1): GameMapImp {
        const map: GameMapImp = this._createMap(width, height, seed, level);
        this._createDoor(map, this._rotEngine);
        this._generateEntryPoint(map, this._rotEngine);
        this._generateExitPoint(map, this._rotEngine);
        map.rooms = this._rotEngine.getRooms();
        return map;
    }

    private _createMap(width: number, height: number, seed: number, level: number): GameMapImp {
        RNG.setSeed(seed);
        const map: GameMapImp = new GameMapImp(width, height).setSeed(seed)
                                                             .setLevel(level);
        this._rotEngine = new Digger(width, height);
        this._rotEngine.create((x: number, y: number, value: number) => {
            const tile: Tile = TilesFactory.createTile((value === 1) ? TileType.WALL : TileType.FLOOR, new Position2D(x, y));
            map.setTile(tile);
        });
        return map;
    }

    private _generateExitPoint(map: GameMapImp, rotMap: Digger) {
        const rooms: Array<Room> = rotMap.getRooms();
        const lastRoom: Room = rooms[0];
        const center: number[] = lastRoom.getCenter();
        map.exitPosition = new Position2D(center[0], center[1]);
        const tile: Tile = TilesFactory.createTile(TileType.STAIRUP, map.exitPosition);
        map.setTile(tile);
    }

    private _generateEntryPoint(map: GameMapImp, rotMap: Digger) {
        const rooms: Array<Room> = rotMap.getRooms();
        const firstRoom: Room = rooms[rooms.length - 1];
        const center: number[] = firstRoom.getCenter();
        map.entryPosition = new Position2D(center[0], center[1]);
        const tile: Tile = TilesFactory.createTile(TileType.STAIRDOWN, map.entryPosition);
        map.setTile(tile);
    }

    private _createDoor(map: GameMapImp, rotMap: Digger) {
        const rooms: Array<Room> = rotMap.getRooms();
        let room: Room = null;
        for (let i = 0; i < rooms.length; i++) {
            room = rooms[i];
            room.getDoors((x: number, y: number) => {
                const tile: Tile = TilesFactory.createTile(TileType.DOOR, new Position2D(x, y));
                map.setTile(tile);
            });
        }
    }
}
