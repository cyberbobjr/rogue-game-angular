import {Component, OnInit} from '@angular/core';
import {EntitiesManager} from '../../game/services/entities-manager.service';
import {Router} from '@angular/router';
import {MapEngine} from '../../game/services/map-engine.service';
import {StorageService} from '../../game/services/storage.service';
import {Player} from '../../../core/classes/entities/player';
import {JsonEntity, JsonMap} from 'src/app/core/interfaces/json-interfaces';
import {GameMap} from '../../../core/classes/base/game-map';
import {Error} from 'tslint/lib/error';
import {Config} from '../../../core/config';
import {Entity} from '../../../core/classes/base/entity';
import {MapBuilder} from '../../../core/factories/map-builder';

@Component({
             selector: 'app-menu-page',
             templateUrl: './menu-page.component.html',
             styleUrls: ['./menu-page.component.css']
           })
export class MenuPageComponent implements OnInit {
  private _isGameStarted = false;
  private _isPlayerExist = false;
  private _player: Player = null;

  constructor(private _entitiesServices: EntitiesManager,
              private _storageService: StorageService,
              private _mapEngine: MapEngine,
              private _router: Router) {
  }

  ngOnInit() {
    this._storageService
        .loadPlayer()
        .then((player: Player) => {
          this._player = player;
          this._isPlayerExist = !!this._player;
          this._isGameStarted = !!(this._player.mapLevel && this._player.position);
          if (this._isGameStarted) {
            this._storageService.loadRawMap(this._player.mapLevel)
                .then((mapLoaded: { map: JsonMap, entities: Array<JsonEntity> } | null) => {
                  this._isGameStarted = this._isPlayerExist ? (!!this._player.position && !!mapLoaded) : false;
                });
          }
        })
        .catch((e: Error) => {
          console.log(e.message);
          console.trace();
        });
  }

  async startNewGame() {
    this._mapEngine.generateMaps(Config.maxLevel)
        .then(() => {
          return this._storageService.loadRawMap(1);
        })
        .then((data: { map: JsonMap, entities: Array<JsonEntity> }) => {
          const gameMap: GameMap = MapBuilder.fromJSON(data.map);
          this._player.setMapLevelAndPosition(1, gameMap.entryPosition);
          this._player.setToFullHp();
          this._storageService.savePlayer(this._player);
          this._router.navigateByUrl('game');
        })
        .catch((err) => {
          console.log(err);
        });
  }
}
