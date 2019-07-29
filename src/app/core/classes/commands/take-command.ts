import {Command} from './command';
import {GameEngine} from '../../../modules/game/services/game-engine.service';
import {Entity} from '../base/entity';
import {TakeAction} from '../actions/take-action';

export class TakeCommand implements Command {
  execute(actor: Entity, gameEngine: GameEngine) {
    actor.setNextAction(new TakeAction());
  }
}
