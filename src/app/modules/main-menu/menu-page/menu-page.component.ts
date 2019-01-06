import {Component, OnInit} from '@angular/core';
import {EntitiesService} from '../../game/services/entities.service';
import {Router} from '@angular/router';
import {MapEngine} from '../../game/services/map-engine.service';
import {StorageService} from '../../game/services/storage.service';
import {Player} from '../../../core/classes/entities/player';
import {JsonEntity, JsonMap} from 'src/app/core/interfaces/json-interfaces';

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
    this._storageService.loadPlayer().then((player: Player) => {
      this._player = player;
      this._storageService.loadMap().then((data) => {
        const mapLoaded: { map: JsonMap, _entities: Array<JsonEntity> } | null = data;
        this._isPlayerExist = !!this._player;
        this._isGameStarted = this._isPlayerExist ? (!!this._player.position && !!mapLoaded) : false;
      });
    });
  }

  startNewGame() {
    this._mapEngine.generateMaps(42);
    //this._storageService.saveGameState();
    this._router.navigateByUrl('game');
  }
}
