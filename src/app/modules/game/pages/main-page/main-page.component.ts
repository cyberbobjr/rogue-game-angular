import {Component, OnDestroy, OnInit} from '@angular/core';
import {MapEngine} from '../../services/map-engine.service';
import {GameEngineService} from '../../services/game-engine.service';
import {EntitiesService} from '../../services/entities.service';
import {StorageService} from '../../services/storage.service';
import {Player} from '../../../../core/classes/entities/player';
import {Router} from '@angular/router';
import {NgxSmartModalService} from 'ngx-smart-modal';

@Component({
             selector: 'app-main-page',
             templateUrl: './main-page.component.html',
             styleUrls: ['./main-page.component.css']
           })
export class MainPageComponent implements OnInit, OnDestroy {

  constructor(private _mapEngine: MapEngine,
              private _gameEngineService: GameEngineService,
              private _entitiesService: EntitiesService,
              private _storage: StorageService,
              private _router: Router,
              private _modalService: NgxSmartModalService) {
  }

  ngOnInit() {
    console.log('Main page init');
    const player: Player = this._initPlayer();
    const level: number = player.level;
    this._initMap(level);
    this._entitiesService.player = player;
    this._gameEngineService.setModalService(this._modalService);
    this._gameEngineService.startGameLoop();
  }

  ngOnDestroy() {
    this._gameEngineService.endGameLoop();
  }

  private _initPlayer(): Player {
    const playerLoaded: Player = StorageService.loadPlayer();
    if (!playerLoaded || !playerLoaded.position) {
      this._goBackToMenu();
    } else {
      return playerLoaded;
    }
  }

  private _initMap(level: number) {
    if (!this._storage.loadMap(level)) {
      this._goBackToMenu();
    }
  }

  private _goBackToMenu() {
    this._router.navigateByUrl('');
  }
}
