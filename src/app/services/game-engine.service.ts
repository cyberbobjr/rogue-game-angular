import {Injectable} from '@angular/core';
import {EntitiesService} from './entities.service';
import {MapEngine} from './map-engine.service';
import {LoggingService} from './logging.service';
import {DisplayService} from './display.service';
import {CommandsService} from './commands.service';
import {ActionResult} from '../classes/actions/action-result';

@Injectable({
              providedIn: 'root'
            })
export class GameEngineService {
  private _currentActorIndex = 0;

  get mapEngine(): MapEngine {
    return this._mapEngine;
  }

  constructor(private _entitiesService: EntitiesService,
              private _mapEngine: MapEngine,
              private _logService: LoggingService,
              private _displayService: DisplayService,
              private _commandService: CommandsService) {
  }

  startGameLoop() {
    return setInterval(() => {
      this.processAction();
      this.refreshMap();
    }, 250);
  }

  handleKeyEvent(key: KeyboardEvent) {
    const player = this._entitiesService.player;
    switch (key.code) {
      case 'ArrowUp':
        this._commandService.ArrowUp.execute(player, this);
        break;
      case 'ArrowLeft':
        this._commandService.ArrowLeft.execute(player, this);
        break;
      case 'ArrowDown':
        this._commandService.ArrowDown.execute(player, this);
        break;
      case 'ArrowRight':
        this._commandService.ArrowRight.execute(player, this);
        break;
      case 'KeyH':
        this._commandService.KeyH.execute(player, this);
        break;
      case 'KeyU':
        this._commandService.KeyU.execute(player, this);
        break;
      case 'KeyY':
        this._commandService.KeyY.execute(player, this);
        break;
      case 'KeyI':
        this._commandService.KeyI.execute(player, this);
        break;
      case 'KeyB':
        this._commandService.KeyB.execute(player, this);
        break;
      case 'KeyM':
        this._commandService.KeyM.execute(player, this);
        break;
      case 'KeyN':
        this._commandService.KeyN.execute(player, this);
        break;
      case 'KeyK':
        this._commandService.KeyK.execute(player, this);
        break;
      case 'KeyO':
        this._commandService.KeyO.execute(player, this);
        break;
    }
  }

  private refreshMap() {
    this._displayService.cameraPosition = this._entitiesService.player.position;
    this._displayService.draw();
  }

  private processAction() {
    const currentActor = this._entitiesService.entities[this._currentActorIndex];
    let actorAction = currentActor.getAction();
    if (actorAction === null) {
      return;
    }
    while (true) {
      const resultAction: ActionResult = actorAction.execute(currentActor, this._mapEngine);
      if (resultAction.succeeded) {
        break;
      }
      if (!resultAction.alternative) {
        return;
      }
      actorAction = Object.create(resultAction.alternative);
      resultAction.alternative = null;
    }
    currentActor.setNextAction(null);

    this._currentActorIndex = (this._currentActorIndex + 1) % this._entitiesService.entities.length;
  }
}
