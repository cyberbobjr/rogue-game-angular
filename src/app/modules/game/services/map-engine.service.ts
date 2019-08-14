import {Injectable} from '@angular/core';
import {GameMap} from '../../../core/classes/base/game-map';
import {Iobject} from '../../../core/interfaces/iobject';
import {JsonEntity, JsonMap} from 'src/app/core/interfaces/json-interfaces';
import {MapBuilder} from 'src/app/core/factories/map-builder';
import {StorageEngine} from 'src/app/modules/game/services/storage-engine.service';
import {Position} from '../../../core/classes/base/position';
import AStar from 'rot-js/lib/path/astar';
import {Path} from 'rot-js';
import {Entity} from '../../../core/classes/base/entity';
import {Tile} from '../../../core/classes/base/tile';
import {DoorTile} from '../../../core/classes/tiles/door-tile';
import {EntitiesEngine} from './entities-engine.service';
import {Utility} from '../../../core/classes/Utility/utility';
import {json} from '@angular-devkit/core';
import {GameEntities} from '../../../core/classes/base/game-entities';

@Injectable({
              providedIn: 'root'
            })
export class MapEngine {
  private _currentMap: GameMap = null;

  constructor() {
  }

  setGameMap(value: GameMap): GameMap {
    this._currentMap = value;
    return this._currentMap;
  }

  getCurrentMap(): GameMap {
    return this._currentMap;
  }

  getNextPosition(originPosition: Position, destPosition: Position): Position | null {
    return this.getCurrentMap()
               .getNextPosition(originPosition, destPosition);
  }

  getTilesAround(position: Position): Array<Array<Iobject>> {
    return this.getCurrentMap()
               .getTilesAround(position);
  }

  getTileAt(position: Position): Tile {
    return <Tile>this.getCurrentMap()
                     .getTileAt(position);
  }

  computeLOSMap(actorLOS: Entity) {
    this.getCurrentMap()
        .computeLOSMap(actorLOS);
  }
}
