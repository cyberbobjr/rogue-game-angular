import {Component, OnInit} from '@angular/core';
import {EntitiesService} from '../../game/services/entities.service';
import {Router} from '@angular/router';
import {MapEngine} from '../../game/services/map-engine.service';
import {StorageService} from '../../game/services/storage.service';
import {Player} from '../../../core/classes/entities/player';

@Component({
             selector: 'app-menu-page',
             templateUrl: './menu-page.component.html',
             styleUrls: ['./menu-page.component.css']
           })
export class MenuPageComponent implements OnInit {
  private _isGameStarted: boolean;
  private _isPlayerExist: boolean;
  private _player: Player = null;

  constructor(private _entitiesServices: EntitiesService,
              private _storageService: StorageService,
              private _mapEngine: MapEngine,
              private _router: Router) {
  }

  ngOnInit() {
    this._player = StorageService.loadPlayer();
    const mapLoaded: boolean = this._storageService.loadMap();
    this._isPlayerExist = !!this._player;
    this._isGameStarted = this._isPlayerExist ? (!!this._player.position && mapLoaded) : false;
  }

  startNewGame() {
    this._mapEngine.generateMap(80, 80, Math.round(Math.random() * 100), 1);
    this._player.position = this._mapEngine.getStartPosition();
    this._player.level = 1;
    this._entitiesServices.entities = this._mapEngine.generateMonsters([0]);
    this._entitiesServices.player = this._player;

    this._storageService.saveGameState();
    this._router.navigateByUrl('game');
  }
}
