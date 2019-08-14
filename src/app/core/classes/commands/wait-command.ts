import {AbstractCommand, Command} from '../../interfaces/command';
import {GameEngineImp} from '../../../modules/game/services/game-engine-imp.service';
import {Entity} from '../base/entity';
import {EventLog} from '../Utility/event-log';

export class WaitCommand extends AbstractCommand implements Command {
  execute(actor: Entity) {
    EventLog.getInstance().message = 'Waiting...';
    actor.onRest();
    actor.setNextAction(null);
  }
}
