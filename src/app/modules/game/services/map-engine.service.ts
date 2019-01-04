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
  private _gameMap: GameMap<Iobject> = null;
  private _map: GameMap<Iobject> = null;
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

  get map(): GameMap<Iobject> {
    return this._map;
  }

  set map(gameMap: GameMap<Iobject>) {
    this._map = gameMap;
  }

  get gameMap(): GameMap<Iobject> {
    return this._gameMap;
  }

  get rotEngine(): Digger {
    return this._rotEngine;
  }

  set rotEngine(mapGen: Digger) {
    this._rotEngine = mapGen;
  }

  set gameMap(value: GameMap<Iobject>) {
    this._gameMap = value;
  }

  constructor(private _entitiesService: EntitiesService,
              private _mapGenerator: MapGenerator,
              private _storageService: StorageService) {
  }

  generateMaps(nbOfMaps: number = 42) {
    for (let level = 1; level < nbOfMaps + 1; level++) {
      const map: GameMap<Iobject> = this._mapGenerator.generateNewMap(level);
      this._storageService.saveMap(map);
    }
  }

  loadMap(jsonData: { map: JsonMap, _entities: Array<JsonEntity> }) {
    this._gameMap = this._mapGenerator.loadMap(jsonData);
    this._createFovCasting();
  }

  computeFOV(position: Position): GameMap<Iobject> {
    const mainActor: Entity = this._entitiesService.player;
    if (!mainActor) {
      return;
    }
    const lightRadius: number = mainActor.lightRadius;
    const lightPower: number = mainActor.ligthPower;
    this._gameMap = this._putEntitiesOn(this._map.clone());
    this._resetLightMap(this._gameMap);
    this._entitiesVisibles.splice(0);
    this._preciseShadowcasting.compute(position.x, position.y, lightRadius, (x: number, y: number, R: number, visibility: number) => {
      try {
        const tile: Iobject = <Iobject>this._gameMap.getDataAt(x, y);
        const sprite = tile.sprite;
        sprite.light = true;
        sprite.visibility = R / lightPower;
        if (tile instanceof Monster && sprite.visibility > 0) {
          this._entitiesVisibles.push(<Entity>this._gameMap.getDataAt(x, y));
        }
      } catch (e) {
      }
    });
    return this._gameMap;
  }

  getTilesAround(position: Position): Array<Array<Iobject>> {
    const test: GameMap<Iobject> = this.gameMap.extract(position.x - 1, position.y - 1, 3, 3);
    return test.content;
  }

  getTileOrEntityAt(position: Position): Iobject {
    const monster: Iobject = this._entitiesService.getEntityAt(position);
    if (monster) {
      return monster;
    }
    return <Iobject>this._map.getDataAt(position.x, position.y);
  }

  getTileAt(position: Position): Tile {
    return <Tile>this._map.getDataAt(position.x, position.y);
  }

  getDirectionToPlayer(originPosition: Position): Position | null {
    const player: Entity = this._entitiesService.player;
    const astar: AStar = new Path.AStar(player.position.x, player.position.y, (x: number, y: number) => {
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

  private _putEntitiesOn(gameMap: GameMap<Iobject>): GameMap<Iobject> {
    for (const actor of this._entitiesService.entities) {
      const position: Position = (actor as Entity).position;
      gameMap.content[position.y][position.x] = actor;
    }
    return gameMap;
  }

  private _createFovCasting() {
    this._preciseShadowcasting = new PreciseShadowcasting((x: number, y: number) => {
      try {
        const info = <Tile>this.gameMap.getDataAt(x, y);
        return !info.opaque;
      } catch (e) {
        return false;
      }
    }, {topology: 8});
  }
}
