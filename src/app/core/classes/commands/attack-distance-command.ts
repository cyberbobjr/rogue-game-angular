import {Command} from '../../interfaces/command';
import {Entity} from '../base/entity';
import {GameEngine} from '../../../modules/game/services/game-engine.service';
import {FireAction} from '../actions/fire-action';

export class AttackDistanceCommand implements Command {
  execute(actor: Entity, gameEngine: GameEngine) {
    actor.setNextAction(new FireAction());
  }
}
