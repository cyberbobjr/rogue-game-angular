import {Player} from '../entities/player';
import {MapEngine} from '@core/core/engines/map-engine';
import {Entity} from '../base/entity';
import {GameMapImp} from '../base/game-map-imp';
import {Position2D} from '../base/position2D';
import {Iobject} from '../../interfaces/iobject';
import {GameEntities} from '../base/game-entities';
import {EntitiesEngine} from '@core/core/engines/entities-engine';
import {KeyboardEngine} from '@services/keyboard-engine.service';
import {BusEventsGame} from '@core/core/busEvents/BusEventsGame';
import {DisplayEngine} from '@core/core/engines/display-engine';

export interface GameEngine {
    getPlayer(): Player;

    getMapEngine(): MapEngine;

    getEntityEngine(): EntitiesEngine;

    getKeyboardEngine(): KeyboardEngine;

    getDisplayEngine(): DisplayEngine;

    getBusEventGame(): BusEventsGame;

    saveGameState(): void;

    changeLevel(level: number): void;

    getEntitiesVisibles(): Array<Entity>;

    setGeneralKeyboardHandlerCommand(): void;

    loadGame(gameMap: GameMapImp, gameEntities: GameEntities, player?: Player): void;

    executeEntitiesActions(): void;

    getTileOrEntityAt(position: Position2D): Iobject;

    winGame(): void;

    looseGame(): void;

    openModal(id: string): void;
}
