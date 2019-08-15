import {AbstractCommand, Command} from '../../interfaces/command';
import {Entity} from '../base/entity';
import {EventLog} from '../Utility/event-log';

export class SaveCommand extends AbstractCommand implements Command {
  execute(actor: Entity) {
    this._gameEngine.saveGameState();
    EventLog.getInstance().message = 'Game saved!';
    actor.setNextAction(null);
  }
}
