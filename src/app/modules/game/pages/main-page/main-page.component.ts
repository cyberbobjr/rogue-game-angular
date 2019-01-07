import {Component, OnDestroy, OnInit} from '@angular/core';
import {MapEngine} from '../../services/map-engine.service';
import {GameEngineService} from '../../services/game-engine.service';
import {EntitiesService} from '../../services/entities.service';
import {StorageService} from '../../services/storage.service';
import {Player} from '../../../../core/classes/entities/player';
import {Router} from '@angular/router';
import {NgxSmartModalService} from 'ngx-smart-modal';
import {JsonEntity, JsonMap} from 'src/app/core/interfaces/json-interfaces';

@Component({
             selector: 'app-main-page',
             templateUrl: './main-page.component.html',
             styleUrls: ['./main-page.component.css']
           })
export class MainPageComponent implements OnInit, OnDestroy {

  constructor(private _mapEngine: MapEngine,
              private _gameEngineService: GameEngineService,
              private _entitiesService: EntitiesService,
              private _storageService: StorageService,
              private _router: Router,
              private _modalService: NgxSmartModalService) {
  }

  ngOnInit() {
    console.log('Main page init');
    this._initPlayer()
        .then((player: Player) => {
          this._entitiesService.player = player;
          return this._storageService.loadMap(player.level);
        })
        .then((mapData: { map: JsonMap, _entities: Array<JsonEntity> }) => {
          this._mapEngine.loadMap(mapData);
          this._gameEngineService.setModalService(this._modalService);
          this._gameEngineService.startGameLoop();
        });
  }

  ngOnDestroy() {
    this._gameEngineService.endGameLoop();
  }

  private async _initPlayer() {
    const playerLoaded: Player = await this._storageService.loadPlayer();
    if (!playerLoaded || !playerLoaded.position) {
      this._goBackToMenu();
    } else {
      return playerLoaded;
    }
  }

  private _goBackToMenu() {
    this._router.navigateByUrl('');
  }
}
