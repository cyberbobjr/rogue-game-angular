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

export interface JsonSprite {
  _color: string;
  _character: string;
  _bgColor: string;
  _light: boolean;
  _visibility: number;
}

export interface JsonPosition {
  _x: number;
  _y: number;
}

export interface JSonCell {
  _type: number;
  _name: string;
  _opaque: boolean;
  _position: JsonPosition;
  _sprite: JsonSprite;
}

export interface JsonMap {
  _data: [[JSonCell]];
  _height: number;
  _width: number;
}

export interface JsonEntity {
  hp: number;
  name: string;
  position: JsonPosition;
  sprite: JsonSprite;
  type: number;
  strength: number;
  ac: number;
  xp: number;
  hitDice: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  level: number;
}

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

  constructor(private _entitiesService: EntitiesService,
              private _mapEngine: MapEngine) {
  }

  saveGameState() {
    this.savePlayer(this._entitiesService.player);
    this._saveMap();
    this._saveEntities();
  }

  loadMap(): boolean {
    try {
      const map = JSON.parse(window.localStorage.getItem('map')) as JsonMap;
      const seed = JSON.parse(window.localStorage.getItem('seed')) as number;
      if (map && seed) {
        this._mapEngine.generateMap(map._width, map._height, seed);
        this._loadTile(map);
        return true;
      }
      return false;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  loadEntities(): boolean {
    const json = JSON.parse(window.localStorage.getItem('entities'));
    if (!json) {
      return false;
    }
    try {
      json.forEach((entity: JsonEntity) => {
        const monster: Entity = EntitiesFactory.createJsonEntity(entity.type, entity);
        monster.setNextAction(new IdleAction(this._mapEngine, monster));
        this._entitiesService.addEntity(monster);
      });
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  savePlayer(player: Entity) {
    window.localStorage.setItem('player', JSON.stringify(player));
  }

  private _loadTile(mapJson: JsonMap) {
    mapJson._data.forEach((cells: Array<JSonCell>) => {
      cells.forEach((cell: JSonCell) => {
        const position: Position = new Position(cell._position._x, cell._position._y);
        this._mapEngine.map.content[cell._position._y][cell._position._x] = TilesFactory.createJsonTile(<TileType>cell._type, position, cell);
      });
    });
  }

  private _saveMap() {
    window.localStorage.setItem('map', JSON.stringify(this._mapEngine.map));
    window.localStorage.setItem('seed', JSON.stringify(this._mapEngine.seed));
  }

  private _saveEntities() {
    let entities: Array<Entity> = [];
    entities = Object.assign(entities, this._entitiesService.entities);
    entities.shift();
    window.localStorage.setItem('entities', JSON.stringify(entities));
  }
}
