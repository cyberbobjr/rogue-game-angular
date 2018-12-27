import {Injectable} from '@angular/core';
import {EntitiesService} from './entities.service';
import {MapEngine} from './map-engine.service';
import {LoggingService} from './logging.service';
import {DisplayService} from './display.service';
import {CommandsService} from './commands.service';
import {ActionResult} from '../../../core/classes/actions/action-result';
import {StorageService} from './storage.service';
import {Entity} from '../../../core/classes/base/entity';
import {EffectEngine} from './effect-engine.service';
import {NgxSmartModalService} from 'ngx-smart-modal';

window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame;


@Injectable({
              providedIn: 'root'
            })
export class GameEngineService {
  private _gameLoop: any = null;
  private _timeStart: any = null;
  private _handleKeyEvent: (key: KeyboardEvent) => void = null;
  private _modalService: NgxSmartModalService;

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
    this.restoreGameKeyHandler();
  }

  startGameLoop() {
    console.log('Game loop started');
    this._timeStart = performance.now();
    window.requestAnimationFrame((timestamp: any) => {
      this.gameLoop(timestamp);
    });
  }

  gameLoop(timestamp: any) {
    if (timestamp - this._timeStart > 50) {
      this._updateGame();
      EffectEngine.getInstance()
                  .tick(timestamp);
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
      case 'KeyQ':
        this._commandService.KeyQ.execute(player, this);
        break;
      case 'KeyZ':
        this._commandService.KeyZ.execute(player, this);
        break;
      case 'KeyA':
        this._commandService.KeyA.execute(player, this);
        break;
      case 'KeyE':
        this._commandService.KeyE.execute(player, this);
        break;
      case 'KeyW':
        this._commandService.KeyW.execute(player, this);
        break;
      case 'KeyC':
        this._commandService.KeyC.execute(player, this);
        break;
      case 'KeyX':
        this._commandService.KeyX.execute(player, this);
        break;
      case 'KeyD':
        this._commandService.KeyD.execute(player, this);
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
      case 'KeyI':
        this._commandService.KeyI.execute(player, this);
        break;
    }
    this.processAction();
  }

  private _updateGame() {
    this._displayService.cameraPosition = this._entitiesService.player.position;
    this._entitiesService.updateEntities(this._mapEngine);
  }

  private _drawMap() {
    this._displayService.draw();
  }

  processAction() {
    for (let currentActorIndex = 0; currentActorIndex < this._entitiesService.entities.length; currentActorIndex++) {

      const currentActor: Entity = this._entitiesService.getEntityAtIndex(currentActorIndex);
      let actorAction = currentActor.getAction();
      if (actorAction) {
        while (true) {
          const resultAction: ActionResult = actorAction.execute(currentActor, this);
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

  getModalService(): NgxSmartModalService {
    return this._modalService;
  }

  setModalService(value: NgxSmartModalService) {
    this._modalService = value;
  }

  restoreGameKeyHandler() {
    this._handleKeyEvent = this.handleActionKeyEvent;
  }
}
