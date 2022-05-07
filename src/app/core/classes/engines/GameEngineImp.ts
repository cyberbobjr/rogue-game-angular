import {GameEngine} from '../../interfaces/game-engine';
import {KeyboardCapture} from '../../interfaces/keyboardCapture';
import {Player} from '../entities/player';
import {Position} from '../base/position';
import {Iobject} from '../../interfaces/iobject';
import {GameMapImp} from '../base/game-map-imp';
import {GameEntities} from '../base/game-entities';
import {NgxSmartModalService} from 'ngx-smart-modal';
import {MapEngine} from '../../../services/map-engine.service';
import {EntitiesEngine} from '../../../services/entities-engine.service';
import {Entity} from '../base/entity';

class GameEngineImp implements GameEngine {
    captureKeyboardEvent(): void {
    }

    changeLevel(level: number): void {
    }

    executeEntitiesActions(): void {
    }

    getEntitiesVisibles(): Array<Entity> {
        return undefined;
    }

    getEntityEngine(): EntitiesEngine {
        return undefined;
    }

    getMapEngine(): MapEngine {
        return undefined;
    }

    getModalService(): NgxSmartModalService {
        return undefined;
    }

    getPlayer(): Player {
        return undefined;
    }

    getTileOrEntityAt(position: Position): Iobject {
        return undefined;
    }

    loadGame(gameMap: GameMapImp, gameEntities: GameEntities, player?: Player): void {
    }

    looseGame(): void {
    }

    saveGameState(): void {
    }

    setHandleKeyEvent(keyboardCapture: KeyboardCapture) {
    }

    setPlayer(player: Player): void {
    }

    winGame(): void {
    }

}
