import {AbstractCommand, Command} from '../../interfaces/command';
import {Entity} from '../base/entity';
import {FireAction} from '../actions/fire-action';

export class AttackDistanceCommand  extends AbstractCommand implements Command {
  execute(actor: Entity) {
    actor.setNextAction(new FireAction());
  }
}
