import {Player} from '../classes/entities/player';
import {MapEngine} from '../../modules/game/services/map-engine.service';
import {NgxSmartModalService} from 'ngx-smart-modal';
import {Entity} from '../classes/base/entity';
import {KeyboardCapture} from './keyboardCapture';
import {GameMap} from '../classes/base/game-map';

export interface GameEngine {
  getPlayer(): Player;

  getMapEngine(): MapEngine;

  getModalService(): NgxSmartModalService;

  saveGameState(): void;

  gotoUpStair(): void;

  gotoDownStair(): void;

  getEntitiesVisibles(): Array<Entity>;

  setHandleKeyEvent(keyboardCapture: KeyboardCapture);

  captureKeyboardEvent(): void;

  loadGameMap(gameMap: GameMap): void;

  executeEntitiesActions(): void;
}
