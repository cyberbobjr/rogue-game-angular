import {Player} from '../classes/entities/player';
import {MapEngine} from '../../services/map-engine.service';
import {NgxSmartModalService} from 'ngx-smart-modal';
import {Entity} from '../classes/base/entity';
import {KeyboardCapture} from './keyboardCapture';
import {GameMapImp} from '../classes/base/game-map-imp';
import {Position} from '../classes/base/position';
import {Iobject} from './iobject';
import {GameEntities} from '../classes/base/game-entities';
import {EntitiesEngine} from '../../services/entities-engine.service';

export interface GameEngine {
    getPlayer(): Player;

    setPlayer(player: Player): void;

    getMapEngine(): MapEngine;

    getEntityEngine(): EntitiesEngine;

    getModalService(): NgxSmartModalService;

    saveGameState(): void;

    changeLevel(level: number): void;

    getEntitiesVisibles(): Array<Entity>;

    setHandleKeyEvent(keyboardCapture: KeyboardCapture);

    captureKeyboardEvent(): void;

    loadGame(gameMap: GameMapImp, gameEntities: GameEntities, player?: Player): void;

    executeEntitiesActions(): void;

    getTileOrEntityAt(position: Position): Iobject;

    winGame(): void;

    looseGame(): void;
}
