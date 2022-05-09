import {Injectable, OnDestroy} from '@angular/core';
import {EntitiesEngine} from '@core/core/engines/entities-engine';
import {MapEngine} from '@core/core/engines/map-engine';
import {LoggingService} from './logging.service';
import {DisplayEngine} from '@core/core/engines/display-engine';
import {StorageEngine} from './storage-engine.service';
import {Entity} from '@core/core/base/entity';
import {EffectEngine} from './effect-engine.service';
import {NgxSmartModalService} from 'ngx-smart-modal';
import {Router} from '@angular/router';
import {Player} from '@core/core/entities/player';
import {EventLog} from '@core/core/Utility/event-log';
import {GameEntities} from '@core/core/base/game-entities';
import {GameEngine} from '@core/core/engines/GameEngine';
import {GeneralKeyboardCapture} from '@core/core/keyboardCapture/generalKeyboardCapture';
import {Iobject} from '@core/interfaces/iobject';
import {Position2D} from '@core/core/base/position2D';
import {LoadEngine} from '@core/core/engines/load-engine';
import {LoadEngineImp} from '@core/core/engines/LoadEngineImp';
import {KeyboardEngine} from '@services/keyboard-engine.service';
import {BusEventsGame} from '@core/core/busEvents/BusEventsGame';
import {GameMap} from '@core/interfaces/GameMap';

// @ts-ignore
window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame;

@Injectable({
    providedIn: 'root'
})
export class GameEngineImp implements GameEngine, OnDestroy {
    private _gameLoopTimer: any = null;
    private _timeStart: any = null;
    private _keyboardEngine: KeyboardEngine = new KeyboardEngine();
    private _displayEngine: DisplayEngine = new DisplayEngine();
    private _mapEngine: MapEngine = new MapEngine();
    private _entityEngine: EntitiesEngine = new EntitiesEngine();
    private _busEventsGame: BusEventsGame = new BusEventsGame();

    constructor(private _logService: LoggingService,
                private _modalService: NgxSmartModalService,
                private _storageEngine: StorageEngine,
                private _effectEngine: EffectEngine,
                private _router: Router) {
        console.log('Game engine created');
    }

    public ngOnDestroy(): void {
        this.stopEngine();
    }

    public initEngine() {
        this.setGeneralKeyboardHandlerCommand();
    }

    public stopEngine() {
        console.log('Stop Engine');
        this.endGameLoop();
        this._keyboardEngine.ngOnDestroy();
    }

    public getEntityEngine(): EntitiesEngine {
        return this._entityEngine;
    }

    public getKeyboardEngine(): KeyboardEngine {
        return this._keyboardEngine;
    }

    getDisplayEngine(): DisplayEngine {
        return this._displayEngine;
    }

    getBusEventGame(): BusEventsGame {
        return this._busEventsGame;
    }

    public getTileOrEntityAt(position: Position2D): Iobject {
        return this._entityEngine.getEntityAt(position) || this._mapEngine.getTileAt(position);
    }

    public startEngine() {
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
        this._entityEngine.updateEntities(this);
        this._effectEngine.updateEffects(timestamp);
    }

    private _drawGame() {
        const player: Player = this._entityEngine.getPlayer();
        this._mapEngine.computeLOSMap(player);
        this._entityEngine.setVisibilityForEntities(this._mapEngine.getCurrentMap());
        this._displayEngine.drawGameMap(this._mapEngine.getCurrentMap(), this._entityEngine.getGameEntities());
    }

    public getPlayer(): Player {
        return this._entityEngine.getPlayer();
    }

    public getEntitiesVisibles(): Array<Entity> {
        return this._entityEngine.getEntitiesVisiblesOnMap(this._mapEngine.getCurrentMap());
    }

    public getMapEngine(): MapEngine {
        return this._mapEngine;
    }

    public setGeneralKeyboardHandlerCommand() {
        this._keyboardEngine.setKeyboardHandler(new GeneralKeyboardCapture(this));
    }

    public looseGame(): void {
        window.alert('You loose !');
        EventLog.getInstance().message = `You Loose !!!`;
        this.endGameLoop();
        this.stopEngine();
        this._router.navigateByUrl('game/gameover');
    }

    public winGame(): void {
        window.alert('You win !');
        EventLog.getInstance().message = `You Win !!!`;
        this.endGameLoop();
        this.stopEngine();
    }

    public async changeLevel(level: number): Promise<void> {
        this.saveGameState();
        const {map, entities} = await this._storageEngine.loadRawMap(level);
        const loadEngine: LoadEngine = new LoadEngineImp();
        const {gameMap, gameEntities} = loadEngine.convertRawDataToGameData(map, entities, this);
        this.getPlayer().setMapLevelAndPosition(gameMap.level, gameMap.entryPosition);
        this.loadGame(gameMap, gameEntities, this.getPlayer());
        this.saveGameState();
    }

    public loadGame(gameMap: GameMap, gameEntities: GameEntities, player: Player = null): void {
        console.log('load Game');
        gameEntities.setPlayer(player);
        this._mapEngine.setGameMap(gameMap);
        this._entityEngine.setGameEntities(gameEntities);
    }

    public executeEntitiesActions() {
        this._entityEngine.executeEntitiesActions();
    }

    public saveGameState(): void {
        this._storageEngine.saveGameState(this._mapEngine.getCurrentMap(), this._entityEngine.getGameEntities());
    }

    public openModal(id: string): void {
        this._modalService
            .getModal(id)
            .open();
    }

}
