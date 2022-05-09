import {GameEngine} from '../core/engines/GameEngine';
import {Player} from '../core/entities/player';

export interface Command {
  execute();
}

export abstract class AbstractCommand {
  protected actor: Player;

  constructor(protected _gameEngine: GameEngine) {
  }
}
