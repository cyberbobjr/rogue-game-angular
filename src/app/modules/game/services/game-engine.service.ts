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
import {GameMap} from '../../../core/classes/base/gameMap';
import {EventLog} from '../../../core/classes/event-log';
import {Config} from '../../../core/config';
import {Iaction} from '../../../core/interfaces/iaction';

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
    const player: Entity = this._entitiesService.getPlayer() as Entity;
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
        this._commandService.Keyq.execute(player, this);
        break;
      case 'z':
        this._commandService.Keyz.execute(player, this);
        break;
      case 'a':
        this._commandService.Keya.execute(player, this);
        break;
      case 'e':
        this._commandService.Keye.execute(player, this);
        break;
      case 'w':
        this._commandService.Keyw.execute(player, this);
        break;
      case 'c':
        this._commandService.Keyc.execute(player, this);
        break;
      case 'C':
        this._commandService.KeyC.execute(player, this);
        break;
      case 'x':
        this._commandService.Keyx.execute(player, this);
        break;
      case 'd':
        this._commandService.Keyd.execute(player, this);
        break;
      case 'o':
        this._commandService.Keyo.execute(player, this);
        break;
      case 's':
        this._commandService.Keys.execute(player, this);
        break;
      case 't':
        this._commandService.Keyt.execute(player, this);
        break;
      case 'f':
        this._commandService.Keyf.execute(player, this);
        break;
      case 'i':
        this._commandService.Keyi.execute(player, this);
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
    const player: Player = this._entitiesService.getPlayer();
    this._displayService.cameraPosition = player.position;
    this._entitiesService.updateEntities(this);
  }

  private _drawMap() {
    this._displayService.draw(this._mapEngine.getCurrentMap());
  }

  gameOver() {
    this.endGameLoop();
    window.alert('You loose !');
    this._router.navigateByUrl('game/gameover');
  }

  processAction() {
    const entities: Array<Entity> = this._entitiesService.getEntities()
                                        .concat(this._entitiesService.getPlayer());
    for (let currentActorIndex = 0; currentActorIndex < entities.length; currentActorIndex++) {
      const currentActor: Entity = entities[currentActorIndex];
      let actorAction: Iaction = currentActor.getAction();
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
    return this._entitiesService.getPlayer();
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
    const player: Player = this._entitiesService.getPlayer();
    if (player.level === Config.maxLevel) {
      EventLog.getInstance().message = `You Win !!!`;
    } else {
      const newLevel: number = player.level + 1;
      this.changeMapLevel(newLevel);
      EventLog.getInstance().message = `You up the stair to level ${newLevel}`;
    }
  }

  gotoDownStair() {
    const player: Player = this._entitiesService.getPlayer();
    if (player.level === 1) {
      EventLog.getInstance().message = `You  can't go down !`;
    } else {
      const newLevel: number = player.level - 1;
      this.changeMapLevel(newLevel);
      EventLog.getInstance().message = `You down the stair to level ${newLevel}`;
    }
  }

  changeMapLevel(newLevel: number) {
    const player: Player = this._entitiesService.getPlayer();
    // save current level
    this._storageService.saveGameState(this._mapEngine.getCurrentMap());
    // get level if exist
    this._storageService
        .loadMap(newLevel)
        .then((data: { map: JsonMap, _entities: Array<JsonEntity> }) => {
          const gameMap: GameMap = this._mapEngine.setGameMap(this._mapEngine.loadRawMap(data));
          player.setLevelAndPosition(newLevel, gameMap.entryPosition);
          this._storageService.saveGameState(gameMap);
        })
        .catch((err) => {
          console.log(err);
        });
  }

}
