import {Component, OnDestroy, OnInit} from '@angular/core';
import {MapEngine} from '../../services/map-engine.service';
import {GameEngineService} from '../../services/game-engine.service';
import {EntitiesFactory} from '../../factories/entities-factory';
import {EntityType} from '../../enums/entity-type.enum';
import {EntitiesService} from '../../services/entities.service';
import {Room} from 'rot-js/lib/map/features';
import {IdleAction} from '../../classes/actions/idle-action';
import {Entity} from '../../classes/base/entity';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit, OnDestroy {

  constructor(private _mapEngine: MapEngine,
              private _gameEngineService: GameEngineService,
              private _entitiesService: EntitiesService) {
  }

  ngOnInit() {
    console.log('Main page init');
    this._mapEngine.generateMap(80, 80);
    this._createMonsters();
    this._createPlayer();
  }

  ngOnDestroy() {
    this._gameEngineService.endGameLoop();
  }

  private _createMonsters() {
    const rooms: Array<Room> = this._mapEngine.getRooms();
    const nbRooms: number = rooms.length;
    for (let nb = 1; nb < nbRooms - 2; nb++) {
      const orc: Entity = EntitiesFactory.createEntity(EntityType.ORC);
      orc.position = this._mapEngine.getRoomCenter(rooms[nb]);
      orc.mapEngine = this._mapEngine;
      orc.setNextAction(new IdleAction(this._mapEngine, orc));
      this._entitiesService.addEntity(orc);
    }
  }

  private _createPlayer() {
    this._entitiesService.player = EntitiesFactory.createEntity(EntityType.PLAYER);
    this._mapEngine.mainActor = this._entitiesService.player;
    this._entitiesService.player.position = this._mapEngine.getStartPosition();
  }

}
