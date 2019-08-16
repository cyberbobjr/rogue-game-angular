import {AbstractCommand, Command} from '../../interfaces/command';
import {EventLog} from '../Utility/event-log';

export class WaitCommand extends AbstractCommand implements Command {
  execute() {
    this.actor = this._gameEngine.getPlayer();
    EventLog.getInstance().message = 'Waiting...';
    this.actor.onRest();
    this.actor.setNextAction(null);
  }
}
