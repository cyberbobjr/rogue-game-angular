import {Injectable} from '@angular/core';
import {EntitiesService} from './entities.service';
import {WalkAction} from '../classes/walk-action';
import {Direction} from '../enums/direction.enum';
import {MapEngine} from './map-engine.service';
import {LoggingService} from './logging.service';
import {DisplayService} from './display.service';
import {EntitiesFactory} from '../factories/entities-factory';
import {EntityType} from '../enums/entity-type.enum';
import {Position} from '../classes/position';

@Injectable({
              providedIn: 'root'
            })
export class GameEngineService {
  private _currentActorIndex = 0;
  private _entitiesFactory: EntitiesFactory = new EntitiesFactory();

  constructor(private _entitiesService: EntitiesService,
              private _mapEngine: MapEngine,
              private _logService: LoggingService,
              private _displayService: DisplayService) {
  }

  startGameLoop() {
    this.refreshMap();
    return setInterval(() => {
      this.processAction();
    }, 250);
  }

  refreshMap() {
    this._displayService.centerCameraOnPosition(this._entitiesService.player.position);
    this._displayService.draw();
  }

  createPlayer() {
    this._entitiesService.player = this._entitiesFactory.createEntity(EntityType.PLAYER);
    this._entitiesService.player.position = new Position(10, 10);
  }

  processAction() {
    const currentActor = this._entitiesService.entities[this._currentActorIndex];
    const actorAction = currentActor.getAction();
    if (actorAction === null || !actorAction.perform(currentActor)) {
      if (actorAction) {
        this._logService.text.next(actorAction.getInfo());
      }
      return;
    } else {
      this._logService.text.next(actorAction.getInfo());
    }
    this.refreshMap();
    this._currentActorIndex = (this._currentActorIndex + 1) % this._entitiesService.entities.length;
  }

  handleKeyEvent(key: KeyboardEvent) {
    switch (key.code) {
      case 'ArrowUp':
      case 'u':
        this._moveActor(Direction.N);
        break;
      case 'ArrowLeft':
      case 'h':
        this._moveActor(Direction.W);
        break;
      case 'ArrowDown':
      case 'j':
        this._moveActor(Direction.S);
        break;
      case 'ArrowRight':
      case 'k':
        this._moveActor(Direction.E);
        break;
    }
  }

  private _moveActor(direction: Direction) {
    const player = this._entitiesService.player;
    player.setNextAction(new WalkAction(direction, this._mapEngine));
  }
}
