import {Component, OnDestroy, OnInit} from '@angular/core';
import {MapEngine} from '../../services/map-engine.service';
import {GameEngine} from '../../services/game-engine.service';
import {EntitiesManager} from '../../services/entities-manager.service';
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

  constructor(private _gameEngineService: GameEngine,
              private _entitiesService: EntitiesManager,
              private _storageService: StorageService,
              private _router: Router,
              private _modalService: NgxSmartModalService) {
    this._gameEngineService.setModalService(this._modalService);
  }

  ngOnInit() {
    console.log('Main page init');
    this._initPlayer()
        .then((player: Player) => {
          this._entitiesService.setPlayer(player);
          return this._storageService.loadRawMap(player.mapLevel);
        })
        .then((mapData: { map: JsonMap, entities: Array<JsonEntity> }) => {
          this._gameEngineService.loadRawGameMap(mapData);
          this._gameEngineService.startGameLoop();
        })
        .catch((e) => {
          console.log(e);
          console.trace();
          this._goBackToMenu();
        });
  }

  ngOnDestroy() {
    this._gameEngineService.endGameLoop();
  }

  private async _initPlayer() {
    return await this._storageService.loadPlayer();
  }

  private _goBackToMenu() {
    this._router.navigateByUrl('');
  }
}
