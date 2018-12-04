import {Injectable} from '@angular/core';
import {Player} from '../classes/entities/player';
import {EntitiesService} from './entities.service';
import {MapEngine} from './map-engine.service';
import {Entity} from '../classes/base/entity';
import {TilesFactory} from '../factories/tiles-factory';
import {TileType} from '../enums/tile-type.enum';
import {Position} from '../classes/position';
import {Tile} from '../classes/base/tile';

export interface JsonSprite {
  _color: string;
  _character: string;
  _bgColor: string;
}

export interface JsonPosition {
  _x: number;
  _y: number;
}

export interface JsonPlayer {
  _position: JsonPosition;
  _sprite: JsonSprite;
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

@Injectable({
              providedIn: 'root'
            })
export class StorageService {
  constructor(private _entitiesService: EntitiesService,
              private _mapEngine: MapEngine) {
  }

  loadPlayer(): Player | null {
    const json: string = window.localStorage.getItem('player');
    if (!json) {
      return null;
    }
    const playerLoaded: JsonPlayer = JSON.parse(json) as JsonPlayer;
    return Player.fromJSON(playerLoaded);
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
      debugger;
      console.log(e);
      return false;
    }
  }

  saveGameState() {
    this._savePlayer();
    this._saveMap();
    this._saveEntities();
  }

  private _loadTile(mapJson: JsonMap) {
    mapJson._data.forEach((cells: Array<JSonCell>) => {
      cells.forEach((cell: JSonCell) => {
        const position: Position = new Position(cell._position._x, cell._position._y);
        const tile: Tile = TilesFactory.createJsonTile(<TileType>cell._type, position, cell);
        this._mapEngine.map.content[cell._position._y][cell._position._x] = tile;
      });
    });
  }

  private _savePlayer() {
    window.localStorage.setItem('player', JSON.stringify(this._entitiesService.player));
  }

  private _saveMap() {
    window.localStorage.setItem('map', JSON.stringify(this._mapEngine.map));
    window.localStorage.setItem('seed', JSON.stringify(this._mapEngine.seed));
  }

  private _saveEntities() {
    let entities: Array<Entity> = Object.create(this._entitiesService.entities);
    console.log(entities);
    entities = entities.splice(1, 1);
    window.localStorage.setItem('entities', JSON.stringify(entities));
  }
}
