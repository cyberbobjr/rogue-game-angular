import {AbstractCommand, Command} from '../../interfaces/command';
import {EventLog} from '../Utility/event-log';

export class SaveCommand extends AbstractCommand implements Command {
  execute() {
    this.actor = this._gameEngine.getPlayer();
    EventLog.getInstance().message = 'Game saved!';
    this._gameEngine.saveGameState();
    this.actor.setNextAction(null);
  }
}
