import {Component, OnDestroy, OnInit} from '@angular/core';
import {MapEngine} from '../../services/map-engine.service';
import {GameEngineService} from '../../services/game-engine.service';
import {EntitiesFactory} from '../../../../core/factories/entities-factory';
import {EntityType} from '../../../../core/enums/entity-type.enum';
import {EntitiesService} from '../../services/entities.service';
import {Room} from 'rot-js/lib/map/features';
import {IdleAction} from '../../../../core/classes/actions/idle-action';
import {Entity} from '../../../../core/classes/base/entity';
import {StorageService} from '../../services/storage.service';
import {Player} from '../../../../core/classes/entities/player';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit, OnDestroy {

  constructor(private _mapEngine: MapEngine,
              private _gameEngineService: GameEngineService,
              private _entitiesService: EntitiesService,
              private _storage: StorageService) {
  }

  ngOnInit() {
    console.log('Main page init');
    this._initMap();
    this._initPlayer();
    this._initMonsters();
    this._gameEngineService.startGameLoop();
  }

  ngOnDestroy() {
    this._gameEngineService.endGameLoop();
  }

  private _initMonsters() {
    if (!this._storage.loadEntities()) {
      const rooms: Array<Room> = this._mapEngine.getRooms();
      const nbRooms: number = rooms.length;
      for (let nb = 1; nb < nbRooms - 2; nb++) {
        const orc: Entity = EntitiesFactory.createEntity(EntityType.ORC);
        orc.position = this._mapEngine.getRoomCenter(rooms[nb]);
        orc.setNextAction(new IdleAction(this._mapEngine, orc));
        this._entitiesService.addEntity(orc);
      }
    }
  }

  private _initPlayer() {
    const playerLoaded: Player = StorageService.loadPlayer();
    if (playerLoaded && !playerLoaded.position) {
      playerLoaded.position = this._mapEngine.getStartPosition();
    }
    this._entitiesService.player = playerLoaded ? playerLoaded : EntitiesFactory.createEntity(EntityType.PLAYER, this._mapEngine.getStartPosition());
    this._mapEngine.mainActor = this._entitiesService.player;
  }

  private _initMap() {
    if (!this._storage.loadMap()) {
      this._mapEngine.generateMap(80, 80);
    }
  }
}
