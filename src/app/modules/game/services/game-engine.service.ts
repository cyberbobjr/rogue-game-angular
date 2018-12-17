import {Injectable} from '@angular/core';
import {EntitiesService} from './entities.service';
import {MapEngine} from './map-engine.service';
import {LoggingService} from './logging.service';
import {DisplayService} from './display.service';
import {CommandsService} from './commands.service';
import {ActionResult} from '../../../core/classes/actions/action-result';
import {StorageService} from './storage.service';
import {Entity} from '../../../core/classes/base/entity';

window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame;


@Injectable({
              providedIn: 'root'
            })
export class GameEngineService {
  private _gameLoop: any = null;
  private _timeStart: any = null;
  private _handleKeyEvent: (key: KeyboardEvent) => void = null;

  get handleKeyEvent(): (key: KeyboardEvent) => void {
    return this._handleKeyEvent.bind(this);
  }

  set handleKeyEvent(value: (key: KeyboardEvent) => void) {
    this._handleKeyEvent = value;
  }

  get mapEngine(): MapEngine {
    return this._mapEngine;
  }

  get storageEngine(): StorageService {
    return this._storageService;
  }

  constructor(private _entitiesService: EntitiesService,
              private _mapEngine: MapEngine,
              private _logService: LoggingService,
              private _displayService: DisplayService,
              private _commandService: CommandsService,
              private _storageService: StorageService) {
    console.log('Game engine created');
    this._handleKeyEvent = this.handleActionKeyEvent;
  }

  startGameLoop() {
    console.log('Game loop started');
    this._timeStart = performance.now();
    window.requestAnimationFrame((timestamp: any) => {
      this.gameLoop(timestamp);
    });
  }

  gameLoop(timestamp: any) {
    if (timestamp - this._timeStart > 2) {
      this._updateGame();
      this._drawMap();
      this._timeStart = performance.now();
    }
    window.requestAnimationFrame((timestamp2: any) => {
      this.gameLoop(timestamp2);
    });
  }

  endGameLoop() {
    window.cancelAnimationFrame(this._gameLoop);
  }

  handleActionKeyEvent(key: KeyboardEvent): void {
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
      case 'KeyS':
        this._commandService.KeyS.execute(player, this);
        break;
      case 'KeyT':
        this._commandService.KeyT.execute(player, this);
        break;
      case 'KeyF':
        this._commandService.KeyF.execute(player, this);
        break;
    }
    this.processAction();
  }

  private _updateGame() {
    this._displayService.cameraPosition = this._entitiesService.player.position;
    this._entitiesService.update(this._mapEngine);
  }

  private _drawMap() {
    this._displayService.draw();
  }

  private processAction() {
    for (let currentActorIndex = 0; currentActorIndex < this._entitiesService.entities.length; currentActorIndex++) {

      const currentActor: Entity = this._entitiesService.getEntityAtIndex(currentActorIndex);
      let actorAction = currentActor.getAction();
      if (actorAction) {
        while (true) {
          const resultAction: ActionResult = actorAction.execute(currentActor);
          if (resultAction.succeeded) {
            break;
          }
          if (!resultAction.alternative) {
            return;
          }
          actorAction = Object.create(resultAction.alternative);
          resultAction.alternative = null;
        }
      }
    }
  }
}
