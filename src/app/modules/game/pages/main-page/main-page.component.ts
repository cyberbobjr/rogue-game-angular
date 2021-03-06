import {Component, OnDestroy, OnInit} from '@angular/core';
import {GameEngine} from '../../services/game-engine.service';
import {EntitiesEngine} from '../../services/entities-engine.service';
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
              private _entitiesService: EntitiesEngine,
              private _storageService: StorageService,
              private _router: Router,
              private _modalService: NgxSmartModalService) {
  }

  ngOnInit() {
    console.log('Main page init');
    this._initGame();
  }

  private async _initGame() {
    try {
      const player: Player = await this._initPlayer();
      const mapData: { map: JsonMap, entities: Array<JsonEntity> } = await this._storageService.loadRawMap(player.mapLevel);
      this._gameEngineService.loadRawGameMap(mapData);
      this._entitiesService.setPlayer(player);
      this._gameEngineService.startGameLoop();
      this._gameEngineService.setModalService(this._modalService);
    } catch (e) {
      console.log(e);
      console.trace();
      this._goBackToMenu();
    }
  }

  ngOnDestroy() {
    this._gameEngineService.endGameLoop();
  }

  private _initPlayer(): Promise<Player> {
    return this._storageService.loadPlayer();
  }

  private _goBackToMenu() {
    this._router.navigateByUrl('');
  }
}
