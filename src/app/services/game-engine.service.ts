import {Injectable} from '@angular/core';
import {EntitiesService} from './entities.service';
import {IEntity} from '../interfaces/ientity';
import {Position} from '../classes/position';
import {Player} from '../classes/player';
import {WalkAction} from '../classes/walk-action';
import {Direction} from '../enums/direction.enum';
import {MapEngine} from './map-engine.service';
import {LoggingService} from './logging.service';
import {DisplayService} from './display.service';

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
      this.process();
      this._displayService.setCameraPosition(this._entitiesService.player.position);
      this._displayService.drawMap();
      this._displayService.drawEntities();
    }, 250);
  }

  refreshDisplay() {

  }

  createPlayer() {
    this._entitiesService.player = new Player('player', '@', new Position(70, 70));
  }

  process() {
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
