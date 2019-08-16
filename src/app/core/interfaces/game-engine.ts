import {Player} from '../classes/entities/player';
import {MapEngine} from '../../modules/game/services/map-engine.service';
import {NgxSmartModalService} from 'ngx-smart-modal';
import {Entity} from '../classes/base/entity';
import {KeyboardCapture} from './keyboardCapture';
import {GameMap} from '../classes/base/game-map';
import {Position} from '../classes/base/position';
import {Iobject} from './iobject';
import {GameEntities} from '../classes/base/game-entities';
import {EntitiesEngine} from '../../modules/game/services/entities-engine.service';

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

  loadGame(gameMap: GameMap, gameEntities: GameEntities, player?: Player): void;

  executeEntitiesActions(): void;

  getTileOrEntityAt(position: Position): Iobject;

  winGame(): void;

  looseGame(): void;
}
