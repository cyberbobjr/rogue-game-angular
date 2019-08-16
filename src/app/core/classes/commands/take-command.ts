import {AbstractCommand, Command} from '../../interfaces/command';
import {TakeAction} from '../actions/take-action';

export class TakeCommand extends AbstractCommand implements Command {
  execute() {
    this.actor = this._gameEngine.getPlayer();
    this.actor.setNextAction(new TakeAction());
  }
}
