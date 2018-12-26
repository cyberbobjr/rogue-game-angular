import {Injectable} from '@angular/core';
import {Player} from '../../../core/classes/entities/player';
import {EntitiesService} from './entities.service';
import {MapEngine} from './map-engine.service';
import {TilesFactory} from '../../../core/factories/tiles-factory';
import {TileType} from '../../../core/enums/tile-type.enum';
import {Position} from '../../../core/classes/base/position';
import {Entity} from '../../../core/classes/base/entity';
import {IdleAction} from '../../../core/classes/actions/idle-action';
import {EntitiesFactory} from '../../../core/factories/entities-factory';
import {JSonCell, JsonEntity, JsonMap} from '../../../core/interfaces/json-interfaces';
import {Tile} from '../../../core/classes/base/tile';
import {GameObjectFactory} from '../../../core/factories/game-object-factory';
import {GameObject} from '../../../core/classes/gameObjects/game-object';


@Injectable({
              providedIn: 'root'
            })
export class StorageService {
  static loadPlayer(): Player | null {
    const json: string = window.localStorage.getItem('player');
    if (!json) {
      return null;
    }
    const playerLoaded: JsonEntity = JSON.parse(json) as JsonEntity;
    return Player.fromJSON(playerLoaded);
  }

  static savePlayer(player: Entity): void {
    window.localStorage.setItem('player', JSON.stringify(player));
  }

  constructor(private _entitiesService: EntitiesService,
              private _mapEngine: MapEngine) {
  }

  saveGameState() {
    StorageService.savePlayer(this._entitiesService.player);
    this._saveMap();
  }

  loadMap(level = 1): boolean {
    try {
      const jsonData = JSON.parse(window.localStorage.getItem('map_' + level)) as { map: JsonMap, _entities: Array<JsonEntity> };
      if (jsonData) {
        this._mapEngine.generateMap(jsonData.map._width, jsonData.map._height, jsonData.map._seed);
        this._createTiles(jsonData.map);
        this._createEntities(jsonData._entities);
        return true;
      }
      return false;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  private _createEntities(entities: Array<JsonEntity>): void {
    const monsters: Array<Entity> = [];
    entities.forEach((entity: JsonEntity) => {
      const monster: Entity = EntitiesFactory.createFromJson(entity);
      monster.setNextAction(new IdleAction(monster, this._mapEngine));
      monsters.push(monster);
    });
    this._entitiesService.entities = monsters;
  }

  private _createTiles(mapJson: JsonMap) {
    mapJson._data.forEach((cells: Array<JSonCell>) => {
      cells.forEach((cell: JSonCell) => {
        const position: Position = new Position(cell._position._x, cell._position._y);
        const tile: Tile = TilesFactory.createJsonTile(<TileType>cell._type, cell);
        this._loadContents(tile, cell._contents);
        this._mapEngine.setTileAt(position, tile);
      });
    });
  }

  private _loadContents(tile: Tile, jsonContent: Array<any>) {
    jsonContent.forEach((content: any) => {
      const gameObject: GameObject = GameObjectFactory.createFromJson(content.objectType, content);
      if (gameObject) {
        tile.dropOn(gameObject);
      }
    });
  }

  private _saveMap() {
    const level: number = this._mapEngine.map.level;
    let entities: Array<Entity> = [];
    entities = Object.assign(entities, this._entitiesService.entities);
    entities.shift();
    window.localStorage.setItem('map_' + level, JSON.stringify({map: this._mapEngine.map, _entities: entities}));
  }
}
