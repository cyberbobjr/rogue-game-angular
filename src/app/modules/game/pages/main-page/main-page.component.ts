import {Component, OnDestroy, OnInit} from '@angular/core';
import {GameEngineService} from '../../../../services/game-engine-imp.service';
import {EntitiesEngine} from '../../../../services/entities-engine.service';
import {Player} from '../../../../core/classes/entities/player';
import {Router} from '@angular/router';
import {NgxSmartModalService} from 'ngx-smart-modal';
import {StorageEngine} from '../../../../services/storage-engine.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit, OnDestroy {

  constructor(private _gameEngineService: GameEngineService,
              private _entitiesService: EntitiesEngine,
              private _storageService: StorageEngine,
              private _router: Router,
              private _modalService: NgxSmartModalService) {
  }

  ngOnInit() {
    console.log('Main page init');
    this._initGame();
  }

  private async _initGame() {
    try {
      const player: Player = await this._storageService.loadPlayer();
      const {map, entities} = await this._storageService.loadRawMap(player.mapLevel);
      const {gameMap, gameEntities} = GameEngineService.convertRawDataToGameData(map, entities);
      this._gameEngineService.loadGame(gameMap, gameEntities, player);
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

  private _goBackToMenu() {
    this._router.navigateByUrl('');
  }
}
