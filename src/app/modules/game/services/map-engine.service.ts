import {Injectable} from '@angular/core';
import {GameMap} from '../../../core/classes/base/game-map';
import {Iobject} from '../../../core/interfaces/iobject';
import {JsonEntity, JsonMap} from 'src/app/core/interfaces/json-interfaces';
import {MapBuilder} from 'src/app/core/factories/map-builder';
import {StorageService} from 'src/app/modules/game/services/storage.service';
import {Position} from '../../../core/classes/base/position';
import AStar from 'rot-js/lib/path/astar';
import {Path} from 'rot-js';
import {Entity} from '../../../core/classes/base/entity';
import {Tile} from '../../../core/classes/base/tile';
import {DoorTile} from '../../../core/classes/tiles/door-tile';
import {EntitiesService} from './entities.service';
import {Utility} from '../../../core/classes/utility';

@Injectable({
              providedIn: 'root'
            })
export class MapEngine {
  private _width: number;
  private _height: number;
  private _currentMap: GameMap = null;

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

  constructor(private _storageService: StorageService,
              private _entitiesService: EntitiesService) {
  }

  async generateMaps(nbOfMaps: number = 42): Promise<boolean> {
    for (let level = 1; level < nbOfMaps + 1; level++) {
      const map: GameMap = new MapBuilder().withLevel(level)
                                           .withSeed(Utility.rolldice(level * 100))
                                           .withRandomEntities(level)
                                           .withRandomChests(nbOfMaps - level)
                                           .build();
      await this._storageService.saveMap(map);
    }
    return true;
  }

  setGameMap(value: GameMap): GameMap {
    this._currentMap = value;
    return this._currentMap;
  }

  getCurrentMap(): GameMap {
    return this._currentMap;
  }

  convertRawMapToGameMap(jsonData: { map: JsonMap, entities: Array<JsonEntity> }): GameMap {
    return MapBuilder.fromJSON(jsonData);
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
    const entity: Iobject = this._entitiesService.getEntityAt(position);
    if (entity) {
      return entity;
    }
    return <Iobject>this.getCurrentMap()
                        .getDataAt(position.x, position.y);
  }

  getTilesAround(position: Position): Array<Array<Iobject>> {
    return this.getCurrentMap()
               .getTilesAround(position);
  }

  getTileAt(position: Position): Tile {
    return <Tile>this.getCurrentMap()
                     .getTileAt(position);
  }
}
