import {Component, OnDestroy, OnInit} from '@angular/core';
import {MapEngine} from '../../services/map-engine.service';
import {GameEngineService} from '../../services/game-engine.service';
import {EntitiesService} from '../../services/entities.service';
import {StorageService} from '../../services/storage.service';
import {Player} from '../../../../core/classes/entities/player';
import {Router} from '@angular/router';
import {Entity} from '../../../../core/classes/base/entity';

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
              private _router: Router) {
  }

  ngOnInit() {
    console.log('Main page init');
    this._initMap();
    this._initMonsters();
    this._initPlayer();
    this._gameEngineService.startGameLoop();
  }

  ngOnDestroy() {
    this._gameEngineService.endGameLoop();
  }

  private _initMonsters() {
    const monsters: Array<Entity> = this._storage.loadEntities();
    if (!monsters) {
      this._goBackToMenu();
    } else {
      this._entitiesService.entities = monsters;
    }
  }

  private _initPlayer() {
    const playerLoaded: Player = StorageService.loadPlayer();
    if (!playerLoaded || !playerLoaded.position) {
      this._goBackToMenu();
    } else {
      this._entitiesService.player = playerLoaded;
      this._mapEngine.mainActor = this._entitiesService.player;
    }
  }

  private _initMap() {
    if (!this._storage.loadMap()) {
      this._goBackToMenu();
    }
  }

  private _goBackToMenu() {
    this._router.navigateByUrl('');
  }
}
