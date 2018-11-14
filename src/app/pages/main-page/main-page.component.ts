import {Component, OnDestroy, OnInit} from '@angular/core';
import {RotMapService} from '../../services/rot-map.service';
import {EntitiesService} from '../../services/entities.service';
import {Entity} from '../../classes/entity';
import {Position} from '../../classes/position';
import {IEntity} from '../../interfaces/ientity';

@Component({
             selector: 'app-main-page',
             templateUrl: './main-page.component.html',
             styleUrls: ['./main-page.component.css']
           })
export class MainPageComponent implements OnInit, OnDestroy {
  private _gameloop: any = null;

  constructor(private rotMapService: RotMapService,
              private entitiesService: EntitiesService) {
  }

  ngOnInit() {
    this.rotMapService.generateNewMap(50, 50);
    this._createPlayer();
  }

  ngOnDestroy() {
    clearTimeout(this._gameloop);
  }

  private _createPlayer() {
    const actorPlayer: IEntity = new Entity('player', '@', new Position(5, 5));
    this.entitiesService.addEntity(actorPlayer);
  }

  startGameLoop() {
    this._gameloop = setTimeout(() => {
    }, 1000);
  }
}
