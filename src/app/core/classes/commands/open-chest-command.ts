import {AbstractCommand, Command} from '../../interfaces/command';
import {OpenChestAction} from '../actions/open-chest-action';

export class OpenChestCommand  extends AbstractCommand implements Command {
  execute() {
    this.actor = this._gameEngine.getPlayer();
    this.actor.setNextAction(new OpenChestAction());
  }
}
