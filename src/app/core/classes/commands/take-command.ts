import {AbstractCommand, Command} from '../../interfaces/command';
import {Entity} from '../base/entity';
import {TakeAction} from '../actions/take-action';

export class TakeCommand extends AbstractCommand implements Command {
  execute(actor: Entity) {
    actor.setNextAction(new TakeAction());
  }
}
