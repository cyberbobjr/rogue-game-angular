import {Command} from './command';
import {GameEngine} from '../../../modules/game/services/game-engine.service';
import {Entity} from '../base/entity';
import {OpenChestAction} from '../actions/open-chest-action';

export class OpenChestCommand implements Command {
  execute(actor: Entity, gameEngine: GameEngine) {
    actor.setNextAction(new OpenChestAction());
  }
}
