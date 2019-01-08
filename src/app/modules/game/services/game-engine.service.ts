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
import {Router} from '@angular/router';
import {JsonEntity, JsonMap} from 'src/app/core/interfaces/json-interfaces';
import {Player} from '../../../core/classes/entities/player';

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
              private _storageService: StorageService,
              private _router: Router) {
    console.log('Game engine created');
    this.restoreGameKeyHandler();
  }

  startGameLoop() {
    console.log('Game loop started');
    this._timeStart = performance.now();
    this._gameLoop = window.requestAnimationFrame((timestamp: any) => {
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
    this._gameLoop = window.requestAnimationFrame((timestamp2: any) => {
      this.gameLoop(timestamp2);
    });
  }

  endGameLoop() {
    window.cancelAnimationFrame(this._gameLoop);
  }

  handleActionKeyEvent(key: KeyboardEvent): void {
    console.log(key.key);
    const player = this._entitiesService.player as Entity;
    switch (key.key) {
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
      case 'q':
        this._commandService.KeyQ.execute(player, this);
        break;
      case 'z':
        this._commandService.KeyZ.execute(player, this);
        break;
      case 'a':
        this._commandService.KeyA.execute(player, this);
        break;
      case 'e':
        this._commandService.KeyE.execute(player, this);
        break;
      case 'w':
        this._commandService.KeyW.execute(player, this);
        break;
      case 'c':
        this._commandService.KeyC.execute(player, this);
        break;
      case 'x':
        this._commandService.KeyX.execute(player, this);
        break;
      case 'd':
        this._commandService.KeyD.execute(player, this);
        break;
      case 'o':
        this._commandService.KeyO.execute(player, this);
        break;
      case 's':
        this._commandService.KeyS.execute(player, this);
        break;
      case 't':
        this._commandService.KeyT.execute(player, this);
        break;
      case 'f':
        this._commandService.KeyF.execute(player, this);
        break;
      case 'i':
        this._commandService.KeyI.execute(player, this);
        break;
      case ' ':
        this._commandService.KeySpace.execute(player, this);
        break;
      case '<':
        this._commandService.KeyDown.execute(player, this);
        break;
      case '>':
        this._commandService.KeyUp.execute(player, this);
        break;
    }
    this.processAction();
  }

  private _updateGame() {
    this._displayService.cameraPosition = this._entitiesService.player.position;
    this._entitiesService.updateEntities(this);
    if (this._entitiesService.player === null) {
      this.endGameLoop();
      this._router.navigateByUrl('game-over');
    }
  }

  private _drawMap() {
    this._displayService.draw(this._mapEngine.getCurrentMap());
  }

  processAction() {
    const entities: Array<Entity> = this._entitiesService.getEntities();
    entities.push(this.getPlayer());
    for (let currentActorIndex = 0; currentActorIndex < entities.length; currentActorIndex++) {
      const currentActor: Entity = entities[currentActorIndex];
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

  getPlayer(): Player {
    return this._entitiesService.player;
  }

  getEntitiesVisibles(): Array<Entity> {
    return this._entitiesService.getEntitiesVisibles();
  }

  getMapEngine(): MapEngine {
    return this._mapEngine;
  }

  restoreGameKeyHandler() {
    this._handleKeyEvent = this.handleActionKeyEvent;
  }

  gotoUpStair() {
    this._entitiesService.player.level = Math.max(1, this._entitiesService.player.level - 1);
    this.changeMapLevel(this._entitiesService.player.level);
  }

  gotoDownStair() {
    this._entitiesService.player.level = Math.min(this._mapEngine.maxLevel, this._entitiesService.player.level + 1);
    this.changeMapLevel(this._entitiesService.player.level);
  }

  changeMapLevel(newLevel: number) {
    // save current level
    this._storageService.saveGameState();
    // get level if exist
    this._storageService.loadMap(newLevel)
        .then((data) => {
          const mapData: { map: JsonMap, _entities: Array<JsonEntity> } = data;
          if (!!mapData) {
            this._mapEngine.loadMap(mapData);
            this._entitiesService.player.level = newLevel;
            this._entitiesService.player.position = this._mapEngine.getCurrentMap().entryPosition;
          } else {
            // throw error
          }
          this._storageService.saveGameState();
        });
  }

}
