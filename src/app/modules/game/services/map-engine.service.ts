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
  private _rotEngine: Digger = null;
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

  get rotEngine(): Digger {
    return this._rotEngine;
  }

  set rotEngine(mapGen: Digger) {
    this._rotEngine = mapGen;
  }

  constructor(private _entitiesService: EntitiesService,
              private _mapGenerator: MapGenerator,
              private _storageService: StorageService) {
  }

  async generateMaps(nbOfMaps: number = 42) {
    for (let level = 1; level < nbOfMaps + 1; level++) {
      const map: GameMap<Iobject> = this._mapGenerator.generateNewMap(level);
      await this._storageService.saveMap(map);
    }
  }

  loadMap(jsonData: { map: JsonMap, _entities: Array<JsonEntity> }): GameMap<Iobject> {
    const gameMap: GameMap<Iobject> = this._mapGenerator.loadMap(jsonData);
    this._createFovCasting(gameMap);
    return gameMap;
  }

  computeFOV(gameMap: GameMap<Iobject>, position: Position): GameMap<Iobject> {
    const mainActor: Entity = this._entitiesService.player;
    if (!mainActor) {
      return;
    }
    const lightRadius: number = mainActor.lightRadius;
    const lightPower: number = mainActor.ligthPower;
    const finalMap: GameMap<Iobject> = gameMap.clone();
    this._resetLightMap(finalMap);
    this._entitiesVisibles.splice(0);
    this._preciseShadowcasting.compute(position.x, position.y, lightRadius, (x: number, y: number, R: number, visibility: number) => {
      try {
        const tile: Iobject = <Iobject>finalMap.getDataAt(x, y);
        const sprite = tile.sprite;
        sprite.light = true;
        sprite.visibility = R / lightPower;
        if (tile instanceof Monster && sprite.visibility > 0) {
          this._entitiesVisibles.push(<Entity>finalMap.getDataAt(x, y));
        }
      } catch (e) {
      }
    });
    return finalMap;
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

  private _createFovCasting(gameMap: GameMap<Iobject>) {
    this._preciseShadowcasting = new PreciseShadowcasting((x: number, y: number) => {
      try {
        const info = <Tile>gameMap.getDataAt(x, y);
        return !info.opaque;
      } catch (e) {
        return false;
      }
    }, {topology: 8});
  }
}
