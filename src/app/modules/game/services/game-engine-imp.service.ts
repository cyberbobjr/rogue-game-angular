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
import {EntityBuilder} from '../../../core/factories/entity-builder';
import {Iobject} from '../../../core/interfaces/iobject';
import {Position} from '../../../core/classes/base/position';

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

  public getEntityEngine(): EntitiesEngine {
    return this._entityEngine;
  }

  public setHandleKeyEvent(keyboardHandler: KeyboardCapture) {
    this._keyboardHandler = keyboardHandler;
  }

  public getTileOrEntityAt(position: Position): Iobject {
    return this._entityEngine.getEntityAt(position) || this._mapEngine.getTileAt(position);
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
    this._displayEngine.drawGameMap(this._mapEngine.getCurrentMap(), this._entityEngine.getGameEntities());
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

  setPlayer(player: Player): void {
    this._entityEngine.setPlayer(player);
  }

  public getEntitiesVisibles(): Array<Entity> {
    return this._entityEngine.getEntitiesVisiblesOnMap(this._mapEngine.getCurrentMap());
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
      EventLog.getInstance().message = `You up the stair to level ${newLevel}`;
      this.changeMapLevel(newLevel);
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

  public changeMapLevel(level: number) {
    this._storageEngine
        .loadRawMap(level)
        .then((data: { map: JsonMap, entities: Array<JsonEntity> }) => {
          this.saveGameState();
          const {gameMap, gameEntities} = this.loadRawGameMap(data);
          this.changePlayerLevel(level, gameMap);
          gameEntities.setPlayer(this.getPlayer());
          this.loadGame(gameMap, gameEntities);
          this.saveGameState();
        })
        .catch((e) => {
          console.log(e);
          console.trace();
        });
  }

  public changePlayerLevel(level: number, gameMap: GameMap) {
    this._entityEngine.getPlayer().setMapLevelAndPosition(level, gameMap.entryPosition);
  }

  public loadRawGameMap(mapData: { map: JsonMap, entities: Array<JsonEntity> }): { gameMap: GameMap, gameEntities: GameEntities } {
    const gameMap: GameMap = MapBuilder.fromJSON(mapData.map);
    const gameEntities: GameEntities = EntityBuilder.fromJSON(mapData.entities);
    return {gameMap, gameEntities};
  }

  public loadGame(gameMap: GameMap, gameEntities: GameEntities): void {
    this._mapEngine.setGameMap(gameMap);
    this._entityEngine.setGameEntities(gameEntities);
  }

  public executeEntitiesActions() {
    this._entityEngine.executeEntitiesActions(this);
  }

  public saveGameState(): void {
    this._storageEngine.saveGameState(this._mapEngine.getCurrentMap(), this._entityEngine.getGameEntities());
  }

}
