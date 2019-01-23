import {Component, OnInit} from '@angular/core';
import {EntitiesService} from '../../game/services/entities.service';
import {Router} from '@angular/router';
import {MapEngine} from '../../game/services/map-engine.service';
import {StorageService} from '../../game/services/storage.service';
import {Player} from '../../../core/classes/entities/player';
import {JsonEntity, JsonMap} from 'src/app/core/interfaces/json-interfaces';
import {GameMap} from '../../../core/classes/base/game-map';
import {Iobject} from '../../../core/interfaces/iobject';
import {Error} from 'tslint/lib/error';
import {Config} from '../../../core/config';

@Component({
             selector: 'app-menu-page',
             templateUrl: './menu-page.component.html',
             styleUrls: ['./menu-page.component.css']
           })
export class MenuPageComponent implements OnInit {
  private _isGameStarted = false;
  private _isPlayerExist = false;
  private _player: Player = null;

  constructor(private _entitiesServices: EntitiesService,
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
          return this._storageService.loadMap(this._player.level);
        })
        .then((mapLoaded: { map: JsonMap, _entities: Array<JsonEntity> } | null) => {
          this._isGameStarted = this._isPlayerExist ? (!!this._player.position && !!mapLoaded) : false;
        })
        .catch((err: Error) => {
          console.log(err.message);
        });
  }

  async startNewGame() {
    this._storageService
        .clearAllMaps()
        .then(() => {
          return this._mapEngine.generateMaps(Config.maxLevel);
        })
        .then(() => {
          this._storageService
              .loadMap(1)
              .then((data: { map: JsonMap, _entities: Array<JsonEntity> }) => {
                const gameMap: GameMap = this._mapEngine.loadRawMap(data);
                this._player.level = 1;
                this._player.position = gameMap.entryPosition;
                this._player.setToFullHp();
                this._storageService.savePlayer(this._player);
                this._router.navigateByUrl('game');
              })
              .catch((err: Error) => {
                console.log(err.message);
              });
        });
  }
}
