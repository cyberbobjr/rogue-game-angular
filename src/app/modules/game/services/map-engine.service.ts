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

  generateMaps(nbOfMaps: number = 42): Array<GameMap> {
    const maps: Array<GameMap> = [];
    for (let level = 1; level < nbOfMaps + 1; level++) {
      maps.push(new MapBuilder().withLevel(level)
                                .withSeed(Utility.rolldice(level * 100))
                                .withRandomEntities(level)
                                .withRandomChests(nbOfMaps - level)
                                .build());
    }
    return maps;
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

  getTileOrEntityAt(position: Position): Iobject {
    const gameEntities: GameEntities = this.getCurrentMap().gameEntities;
    const entity: Iobject = gameEntities.getEntityAt(position);
    if (entity) {
      return entity;
    }
    return this.getCurrentMap()
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

  computeLOSMap(actorLOS: Entity) {
    this.getCurrentMap()
        .computeLOSMap(actorLOS);
  }
}
