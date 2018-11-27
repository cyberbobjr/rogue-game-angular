import {Component, OnDestroy, OnInit} from '@angular/core';
import {MapEngine} from '../../services/map-engine.service';
import {GameEngineService} from '../../services/game-engine.service';
import {GameMap} from '../../classes/gameMap';
import {IEntity} from '../../interfaces/ientity';
import {EntitiesFactory} from '../../factories/entities-factory';
import {EntityType} from '../../enums/entity-type.enum';
import {EntitiesService} from '../../services/entities.service';

@Component({
             selector: 'app-main-page',
             templateUrl: './main-page.component.html',
             styleUrls: ['./main-page.component.css']
           })
export class MainPageComponent implements OnInit, OnDestroy {
  private _gameloop: any = null;
  map: GameMap<IEntity> = null;

  constructor(private _mapEngine: MapEngine,
              private _gameEngineService: GameEngineService,
              private _entitiesService: EntitiesService) {
  }

  ngOnInit() {
    this.map = this._mapEngine.generateMap(80, 80);
    this._entitiesService.player = EntitiesFactory.createEntity(EntityType.PLAYER);
    this._entitiesService.player.position = this._mapEngine.getStartPosition();
    this._gameloop = this._gameEngineService.startGameLoop();
  }

  ngOnDestroy() {
    clearTimeout(this._gameloop);
  }

}
