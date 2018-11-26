import {Injectable} from '@angular/core';
import {EntitiesService} from './entities.service';
import {WalkAction} from '../classes/actions/walk-action';
import {Direction} from '../enums/direction.enum';
import {MapEngine} from './map-engine.service';
import {LoggingService} from './logging.service';
import {DisplayService} from './display.service';
import {EntitiesFactory} from '../factories/entities-factory';
import {EntityType} from '../enums/entity-type.enum';
import {Position} from '../classes/position';
import {Player} from '../classes/entities/player';
import {Entity} from '../classes/base/entity';

@Injectable({
              providedIn: 'root'
            })
export class GameEngineService {
  private _currentActorIndex = 0;

  constructor(private _entitiesService: EntitiesService,
              private _mapEngine: MapEngine,
              private _logService: LoggingService,
              private _displayService: DisplayService) {
  }

  startGameLoop() {
    return setInterval(() => {
      this.processAction();
      this.refreshMap();
    }, 250);
  }

  createPlayer(): Entity {
    this._entitiesService.player = EntitiesFactory.createEntity(EntityType.PLAYER);
    this._entitiesService.player.position = new Position(10, 10);
    return this._entitiesService.player;
  }

  handleKeyEvent(key: KeyboardEvent) {
    switch (key.code) {
      case 'ArrowUp':
      case 'u':
        this.moveActor(Direction.N);
        break;
      case 'ArrowLeft':
      case 'h':
        this.moveActor(Direction.W);
        break;
      case 'ArrowDown':
      case 'j':
        this.moveActor(Direction.S);
        break;
      case 'ArrowRight':
      case 'k':
        this.moveActor(Direction.E);
        break;
    }
  }

  private refreshMap() {
    this._displayService.cameraPosition = this._entitiesService.player.position;
    this._displayService.draw();
  }

  private processAction() {
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
    this._currentActorIndex = (this._currentActorIndex + 1) % this._entitiesService.entities.length;
  }

  private moveActor(direction: Direction) {
    const player = this._entitiesService.player;
    player.setNextAction(new WalkAction(direction, this._mapEngine.map));
  }
}
