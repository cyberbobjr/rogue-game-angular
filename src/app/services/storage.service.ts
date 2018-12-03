import {Injectable} from '@angular/core';
import {Player} from '../classes/entities/player';
import {EntitiesService} from './entities.service';
import {MapEngine} from './map-engine.service';
import {GameMap} from '../classes/gameMap';
import {Tile} from '../classes/base/tile';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(private _entitiesService: EntitiesService,
              private _mapEngine: MapEngine) {
  }

  loadPlayer(): Player | null {
    const json: string = window.localStorage.getItem('player');
    if (json) {
      Object.assign(this._entitiesService.player, JSON.parse(json) as Player);
    }
    return null;
  }

  loadMap(): boolean {
    try {
      const seed = JSON.parse(window.localStorage.getItem('seed'));
      const map = JSON.parse(window.localStorage.getItem('map')) as GameMap<Tile>;
      if (map && seed) {
        this._mapEngine.generateMap(map.width, map.height, seed);
        return true;
      }
      return false;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  saveGameState() {
    this._savePlayer();
    this._saveMap();
  }

  private _savePlayer() {
    window.localStorage.setItem('player', JSON.stringify(this._entitiesService.player));
  }

  private _saveMap() {
    window.localStorage.setItem('map', JSON.stringify(this._mapEngine.map));
  }
}
