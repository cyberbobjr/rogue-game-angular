import {Entity} from '../classes/base/entity';
import {GameEngine} from './game-engine';

export interface Command {
  execute(actor: Entity);
}

export abstract class AbstractCommand {
  constructor(protected _gameEngine: GameEngine) {

  }
}
