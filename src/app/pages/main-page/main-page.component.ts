import {Component, OnDestroy, OnInit} from '@angular/core';
import {MapEngine} from '../../services/map-engine.service';
import {GameEngineService} from '../../services/game-engine.service';
import {DisplayService} from '../../services/display.service';
import {EntitiesService} from '../../services/entities.service';

@Component({
             selector: 'app-main-page',
             templateUrl: './main-page.component.html',
             styleUrls: ['./main-page.component.css']
           })
export class MainPageComponent implements OnInit, OnDestroy {
  private _gameloop: any = null;
  map: string[][] = null;

  constructor(private _rotMapService: MapEngine,
              private _gameEngineService: GameEngineService) {
  }

  ngOnInit() {
    this.map = this._rotMapService.generateNewMap(80, 80);
    this._gameEngineService.createPlayer();
    this._gameloop = this._gameEngineService.startGameLoop();
  }

  ngOnDestroy() {
    clearTimeout(this._gameloop);
  }

}
