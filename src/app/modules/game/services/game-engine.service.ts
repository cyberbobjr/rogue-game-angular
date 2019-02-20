import {Injectable} from '@angular/core';
import {EntitiesService} from './entities.service';
import {MapEngine} from './map-engine.service';
import {LoggingService} from './logging.service';
import {DisplayEngine} from './display-engine.service';
import {CommandsService} from './commands.service';
import {ActionResult} from '../../../core/classes/actions/action-result';
import {StorageService} from './storage.service';
import {Entity} from '../../../core/classes/base/entity';
import {EffectEngine} from './effect-engine.service';
import {NgxSmartModalService} from 'ngx-smart-modal';
import {Router} from '@angular/router';
import {JsonEntity, JsonMap} from 'src/app/core/interfaces/json-interfaces';
import {Player} from '../../../core/classes/entities/player';
import {GameMap} from '../../../core/classes/base/game-map';
import {EventLog} from '../../../core/classes/event-log';
import {Config} from '../../../core/config';
import {Iaction} from '../../../core/interfaces/iaction';
import {MapBuilder} from '../../../core/factories/map-builder';

window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame;


@Injectable({
              providedIn: 'root'
            })
export class GameEngineService {
  private _gameLoopTimer: any = null;
  private _timeStart: any = null;
  private _handleKeyEvent: (key: KeyboardEvent) => void = null;
  private _modalService: NgxSmartModalService;

  get handleKeyEvent(): (key: KeyboardEvent) => void {
    return this._handleKeyEvent.bind(this);
  }

  set handleKeyEvent(value: (key: KeyboardEvent) => void) {
    this._handleKeyEvent = value;
  }

  get storageEngine(): StorageService {
    return this._storageEngine;
  }

  constructor(private _entityEngine: EntitiesService,
              private _mapEngine: MapEngine,
              private _logService: LoggingService,
              private _displayEngine: DisplayEngine,
              private _commandEngine: CommandsService,
              private _storageEngine: StorageService,
              private _effectEngine: EffectEngine,
              private _router: Router) {
    console.log('Game engine created');
    this.restoreGameKeyHandler();
  }

  public startGameLoop() {
    console.log('Game loop started');
    this._timeStart = performance.now();
    this._gameLoopTimer = window.requestAnimationFrame((timestamp: any) => {
      this._gameLoop(timestamp);
    });
  }

  public endGameLoop() {
    console.log('Game loop stop');
    window.cancelAnimationFrame(this._gameLoopTimer);
  }

  private _gameLoop(timestamp: any) {
    if (timestamp - this._timeStart > 50) {
      this._updateGame(timestamp);
      this._drawGame();
      this._timeStart = performance.now();
    }
    this._gameLoopTimer = window.requestAnimationFrame((timestamp2: any) => {
      this._gameLoop(timestamp2);
    });
  }

  public handleActionKeyEvent(key: KeyboardEvent): void {
    const player: Entity = this._entityEngine.getPlayer() as Entity;
    switch (key.key) {
      case 'ArrowUp':
        this._commandEngine.ArrowUp.execute(player, this);
        break;
      case 'ArrowLeft':
        this._commandEngine.ArrowLeft.execute(player, this);
        break;
      case 'ArrowDown':
        this._commandEngine.ArrowDown.execute(player, this);
        break;
      case 'ArrowRight':
        this._commandEngine.ArrowRight.execute(player, this);
        break;
      case 'q':
        this._commandEngine.Keyq.execute(player, this);
        break;
      case 'z':
        this._commandEngine.Keyz.execute(player, this);
        break;
      case 'a':
        this._commandEngine.Keya.execute(player, this);
        break;
      case 'e':
        this._commandEngine.Keye.execute(player, this);
        break;
      case 'w':
        this._commandEngine.Keyw.execute(player, this);
        break;
      case 'c':
        this._commandEngine.Keyc.execute(player, this);
        break;
      case 'C':
        this._commandEngine.KeyC.execute(player, this);
        break;
      case 'x':
        this._commandEngine.Keyx.execute(player, this);
        break;
      case 'd':
        this._commandEngine.Keyd.execute(player, this);
        break;
      case 'o':
        this._commandEngine.Keyo.execute(player, this);
        break;
      case 's':
        this._commandEngine.Keys.execute(player, this);
        break;
      case 't':
        this._commandEngine.Keyt.execute(player, this);
        break;
      case 'f':
        this._commandEngine.Keyf.execute(player, this);
        break;
      case 'i':
        this._commandEngine.Keyi.execute(player, this);
        break;
      case ' ':
        this._commandEngine.KeySpace.execute(player, this);
        break;
      case '<':
        this._commandEngine.KeyDown.execute(player, this);
        break;
      case '>':
        this._commandEngine.KeyUp.execute(player, this);
        break;
    }
    this._entityEngine.processAction(this);
  }

  private _updateGame(timestamp: number) {
    this._entityEngine.updateEntities(this);
    this._effectEngine.updateEffects(timestamp);
  }

  private _drawGame() {
    const player: Player = this._entityEngine.getPlayer();
    const gameMap: GameMap = this._mapEngine.getCurrentMap()
                                 .clone();
    this._entityEngine.drawEntities(gameMap);
    this._effectEngine.drawEffects(gameMap);
    this._displayEngine.draw(gameMap.computeLOSMap(player), player.position);
  }

  public gameOver() {
    this.endGameLoop();
    window.alert('You loose !');
    this._router.navigateByUrl('game/gameover');
  }

  public getModalService(): NgxSmartModalService {
    return this._modalService;
  }

  public setModalService(value: NgxSmartModalService) {
    this._modalService = value;
  }

  public getPlayer(): Player {
    return this._entityEngine.getPlayer();
  }

  public getEntitiesVisibles(): Array<Entity> {
    return this._mapEngine
               .getCurrentMap()
               .getEntitiesVisibles();
  }

  public getMapEngine(): MapEngine {
    return this._mapEngine;
  }

  public restoreGameKeyHandler() {
    this._handleKeyEvent = this.handleActionKeyEvent;
  }

  public gotoUpStair() {
    const player: Player = this._entityEngine.getPlayer();
    if (player.mapLevel === Config.maxLevel) {
      EventLog.getInstance().message = `You Win !!!`;
    } else {
      const newLevel: number = player.mapLevel + 1;
      this.changeMapLevel(newLevel);
      EventLog.getInstance().message = `You up the stair to level ${newLevel}`;
    }
  }

  public gotoDownStair() {
    const player: Player = this._entityEngine.getPlayer();
    if (player.mapLevel === 1) {
      EventLog.getInstance().message = `You  can't go down !`;
    } else {
      const newLevel: number = player.mapLevel - 1;
      this.changeMapLevel(newLevel);
      EventLog.getInstance().message = `You down the stair to level ${newLevel}`;
    }
  }

  public changeMapLevel(newLevel: number) {
    // save current level
    this._storageEngine.saveGameState(this._mapEngine.getCurrentMap(), this.getPlayer());
    // get level if exist
    this._loadMapLevel(newLevel);
  }

  private _loadMapLevel(level: number) {
    this._storageEngine
        .loadRawMap(level)
        .then((data: { map: JsonMap, entities: Array<JsonEntity> }) => {
          const gameMap: GameMap = this.loadRawGameMap(data);
          this._storageEngine.saveGameState(gameMap, this.getPlayer());
        })
        .catch((e) => {
          console.log(e);
          console.trace();
        });
  }

  public loadRawGameMap(mapData: { map: JsonMap, entities: Array<JsonEntity> }): GameMap {
    const gameMap: GameMap = MapBuilder.fromJSON(mapData.map);
    const entities: Array<Entity> = EntitiesService.convertRawEntitiesToEntities(mapData.entities);
    this.loadGameMap(gameMap, entities);
    return gameMap;
  }

  public loadGameMap(gameMap: GameMap, entities: Array<Entity> = []): GameMap {
    this._mapEngine.setGameMap(gameMap);
    this._entityEngine.setEntities(entities);
    return gameMap;
  }
}
