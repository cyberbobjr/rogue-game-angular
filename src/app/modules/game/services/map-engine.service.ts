import {Injectable} from '@angular/core';
import {GameMap} from '../../../core/classes/base/gameMap';
import {Iobject} from '../../../core/interfaces/iobject';
import {JsonEntity, JsonMap} from 'src/app/core/interfaces/json-interfaces';
import {MapGenerator} from 'src/app/modules/game/services/map-generator';
import {StorageService} from 'src/app/modules/game/services/storage.service';
import {Position} from '../../../core/classes/base/position';
import AStar from 'rot-js/lib/path/astar';
import {Path} from 'rot-js';
import {Entity} from '../../../core/classes/base/entity';
import {Tile} from '../../../core/classes/base/tile';
import {DoorTile} from '../../../core/classes/tiles/door-tile';
import {EntitiesService} from './entities.service';

@Injectable({
              providedIn: 'root'
            })
export class MapEngine {
  private _width: number;
  private _height: number;
  private _currentMap: GameMap<Iobject> = null;

  maxLevel = 21;

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

  constructor(private _mapGenerator: MapGenerator,
              private _storageService: StorageService,
              private _entitiesService: EntitiesService) {
  }

  async generateMaps(nbOfMaps: number = 42) {
    for (let level = 1; level < nbOfMaps + 1; level++) {
      const map: GameMap<Iobject> = this._mapGenerator.generateNewMap(level);
      await this._storageService.saveMap(map);
    }
  }

  setGameMap(value: GameMap<Iobject>) {
    this._currentMap = value;
  }

  getCurrentMap(): GameMap<Iobject> {
    return this._currentMap;
  }

  loadMap(jsonData: { map: JsonMap, _entities: Array<JsonEntity> }): GameMap<Iobject> {
    return this._mapGenerator
               .loadMap(jsonData)
               .createFovCasting();
  }

  getDirectionFromPositionToPosition(originPosition: Position, destPosition: Position): Position | null {
    const astar: AStar = new Path.AStar(destPosition.x, destPosition.y, (x: number, y: number) => {
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

  getTileOrEntityAt(position: Position): Iobject {
    const monster: Iobject = this._entitiesService.getEntityAt(position);
    if (monster) {
      return monster;
    }
    return <Iobject>this.getCurrentMap()
                        .getDataAt(position.x, position.y);
  }

  getTilesAround(position: Position): Array<Array<Tile>> {
    return this.getCurrentMap()
               .getTilesAround(position);
  }

  getTileAt(position: Position): Tile {
    return <Tile>this.getCurrentMap()
                     .getTileAt(position);
  }
}
