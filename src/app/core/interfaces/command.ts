import {GameEngine} from './game-engine';
import {Player} from '../classes/entities/player';

export interface Command {
  execute();
}

export abstract class AbstractCommand {
  protected actor: Player;

  constructor(protected _gameEngine: GameEngine) {
  }
}
