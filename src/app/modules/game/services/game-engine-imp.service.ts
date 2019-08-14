import {Injectable} from '@angular/core';
import {EntitiesEngine} from './entities-engine.service';
import {MapEngine} from './map-engine.service';
import {LoggingService} from './logging.service';
import {DisplayEngine} from './display-engine.service';
import {CommandsService} from './commands.service';
import {StorageEngine} from './storage-engine.service';
import {Entity} from '../../../core/classes/base/entity';
import {EffectEngine} from './effect-engine.service';
import {NgxSmartModalService} from 'ngx-smart-modal';
import {Router} from '@angular/router';
import {JsonEntity, JsonMap} from 'src/app/core/interfaces/json-interfaces';
import {Player} from '../../../core/classes/entities/player';
import {GameMap} from '../../../core/classes/base/game-map';
import {EventLog} from '../../../core/classes/Utility/event-log';
import {Config} from '../../../core/config';
import {MapBuilder} from '../../../core/factories/map-builder';
import {GameEntities} from '../../../core/classes/base/game-entities';
import {GameEngine} from '../../../core/interfaces/game-engine';
import {GeneralKeyboardCapture} from '../../../core/classes/Utility/generalKeyboardCapture';
import {KeyboardCapture} from '../../../core/interfaces/keyboardCapture';

window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame;

@Injectable({
  providedIn: 'root'
})
export class GameEngineImp implements GameEngine {
  private _gameLoopTimer: any = null;
  private _timeStart: any = null;
  private _keyboardHandler: KeyboardCapture;
  private _modalService: NgxSmartModalService;

  get keyboardHandler(): KeyboardCapture {
    return this._keyboardHandler;
  }

  set keyboardHandler(value: KeyboardCapture) {
    this._keyboardHandler = value;
  }

  get storageEngine(): StorageEngine {
    return this._storageEngine;
  }

  get gameEntities(): GameEntities {
    return this._entityEngine.getGameEntities();
  }

  get gameMap(): GameMap {
    return this._mapEngine.getCurrentMap();
  }

  constructor(private _entityEngine: EntitiesEngine,
              private _mapEngine: MapEngine,
              private _logService: LoggingService,
              private _displayEngine: DisplayEngine,
              private _commandEngine: CommandsService,
              private _storageEngine: StorageEngine,
              private _effectEngine: EffectEngine,
              private _router: Router) {
    console.log('Game engine created');
    this.captureKeyboardEvent();
    this._commandEngine.gameEngine = this;
  }

  setHandleKeyEvent(keyboardHandler: KeyboardCapture) {
    this._keyboardHandler = keyboardHandler;
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

  private _updateGame(timestamp: number) {
    const player: Player = this._entityEngine.getPlayer();
    this._entityEngine.updateEntities(this);
    this._effectEngine.updateEffects(timestamp);
    this._mapEngine.computeLOSMap(player);
  }

  private _drawGame() {
    const gameMap: GameMap = this._mapEngine.getCurrentMap();
    this._displayEngine.drawGameMap(gameMap);
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
               .getEntitiesVisiblesOnMap();
  }

  public getMapEngine(): MapEngine {
    return this._mapEngine;
  }

  public captureKeyboardEvent() {
    this._keyboardHandler = new GeneralKeyboardCapture(this, this._commandEngine);
  }

  public gotoUpStair(): void {
    const player: Player = this._entityEngine.getPlayer();
    if (player.mapLevel === Config.maxLevel) {
      EventLog.getInstance().message = `You Win !!!`;
    } else {
      const newLevel: number = player.mapLevel + 1;
      this.changeMapLevel(newLevel);
      EventLog.getInstance().message = `You up the stair to level ${newLevel}`;
    }
  }

  public gotoDownStair(): void {
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
    this._storageEngine.saveGameState(this._mapEngine.getCurrentMap(), this._entityEngine.getGameEntities());
    // get level if exist
    this._loadMapLevel(newLevel);
  }

  private _loadMapLevel(level: number) {
    this._storageEngine
        .loadRawMap(level)
        .then((data: { map: JsonMap, entities: Array<JsonEntity> }) => {
          const gameMap: GameMap = this.loadRawGameMap(data);
          this._storageEngine.saveGameState(gameMap, this._entityEngine.getGameEntities());
        })
        .catch((e) => {
          console.log(e);
          console.trace();
        });
  }

  public loadRawGameMap(mapData: { map: JsonMap, entities: Array<JsonEntity> }): GameMap {
    const gameMap: GameMap = MapBuilder.fromJSON(mapData.map);
    gameMap.gameEntities = GameEntities.convertRawEntitiesToGameEntities(mapData.entities);
    this.loadGameMap(gameMap);
    return gameMap;
  }

  public loadGameMap(gameMap: GameMap): GameMap {
    this._mapEngine.setGameMap(gameMap);
    this._entityEngine.setGameEntities(gameMap.gameEntities);
    return gameMap;
  }

  public executeEntitiesActions() {
    this._entityEngine.executeEntitiesActions(this);
  }

  saveGameState(): void {
    this.storageEngine.saveGameState(this._mapEngine.getCurrentMap(), this._entityEngine.getGameEntities());
  }

}
