import {Command} from './command';
import {Entity} from '../base/entity';
import {GameEngine} from '../../../modules/game/services/game-engine.service';
import {AttackDistanceAction} from '../actions/attack-distance-action';

export class AttackDistanceCommand implements Command {
  execute(actor: Entity, gameEngine: GameEngine) {
    actor.setNextAction(new AttackDistanceAction());
  }
}
