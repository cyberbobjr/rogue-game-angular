import {Component, OnDestroy, OnInit} from '@angular/core';
import {RotMapEngine} from '../../services/rot-map-engine.service';
import {GameEngineService} from '../../services/game-engine.service';

@Component({
             selector: 'app-main-page',
             templateUrl: './main-page.component.html',
             styleUrls: ['./main-page.component.css']
           })
export class MainPageComponent implements OnInit, OnDestroy {
  private _gameloop: any = null;
  map: string[][] = null;

  constructor(private _rotMapService: RotMapEngine,
              private _gameEngineService: GameEngineService) {
  }

  ngOnInit() {
    this.map = this._rotMapService.generateNewMap(50, 50);
    this._gameEngineService.createPlayer();
    this.startGameLoop();
  }

  ngOnDestroy() {
    clearTimeout(this._gameloop);
  }

  startGameLoop() {
    this._gameloop = setInterval(() => {
      this._gameEngineService.process();
    }, 1000);
  }
}
