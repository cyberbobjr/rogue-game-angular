import {Component, OnDestroy, OnInit} from '@angular/core';
import {MapEngine} from '../../services/map-engine.service';
import {GameEngineService} from '../../services/game-engine.service';
import {DisplayService} from '../../services/display.service';
import {EntitiesService} from '../../services/entities.service';
import {GameMap} from '../../classes/gameMap';
import {Tile} from '../../classes/base/tile';
import {IEntity} from '../../interfaces/ientity';
import {Entity} from '../../classes/base/entity';

@Component({
             selector: 'app-main-page',
             templateUrl: './main-page.component.html',
             styleUrls: ['./main-page.component.css']
           })
export class MainPageComponent implements OnInit, OnDestroy {
  private _gameloop: any = null;
  map: GameMap<IEntity> = null;

  constructor(private _mapEngine: MapEngine,
              private _gameEngineService: GameEngineService) {
  }

  ngOnInit() {
    this._mapEngine.mainActor = this._gameEngineService.createPlayer();;
    this.map = this._mapEngine.generateMap(80, 80);
    this._gameloop = this._gameEngineService.startGameLoop();
  }

  ngOnDestroy() {
    clearTimeout(this._gameloop);
  }

}
