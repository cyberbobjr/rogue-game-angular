import {Injectable} from '@angular/core';
import {GameMap} from '../../../core/classes/base/gameMap';
import {Entity} from '../../../core/classes/base/entity';
import {Tile} from '../../../core/classes/base/tile';
import {Position} from '../../../core/classes/base/position';
import {EntitiesService} from './entities.service';
import {Iobject} from '../../../core/interfaces/iobject';
import {Path} from 'rot-js/lib';
import AStar from 'rot-js/lib/path/astar';
import PreciseShadowcasting from 'rot-js/lib/fov/precise-shadowcasting';
import Digger from 'rot-js/lib/map/digger';
import {Monster} from '../../../core/classes/entities/monster';
import {Sprite} from '../../../core/classes/base/sprite';
import {DoorTile} from '../../../core/classes/tiles/door-tile';
import {JsonEntity, JsonMap} from 'src/app/core/interfaces/json-interfaces';
import {MapGenerator} from 'src/app/modules/game/services/map-generator';
import {StorageService} from 'src/app/modules/game/services/storage.service';

@Injectable({
              providedIn: 'root'
            })
export class MapEngine {
  private _width: number;
  private _height: number;

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
              private _storageService: StorageService) {
  }

  async generateMaps(nbOfMaps: number = 42) {
    for (let level = 1; level < nbOfMaps + 1; level++) {
      const map: GameMap<Iobject> = this._mapGenerator.generateNewMap(level);
      await this._storageService.saveMap(map);
    }
  }

  loadMap(jsonData: { map: JsonMap, _entities: Array<JsonEntity> }): GameMap<Iobject> {
    return this._mapGenerator
               .loadMap(jsonData)
               .createFovCasting();
  }
}
