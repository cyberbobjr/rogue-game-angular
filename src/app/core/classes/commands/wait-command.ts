import {Command} from './command';
import {GameEngine} from '../../../modules/game/services/game-engine.service';
import {Entity} from '../base/entity';
import {EventLog} from '../event-log';

export class WaitCommand implements Command {
  constructor() {
  }

  execute(actor: Entity, gameEngine: GameEngine) {
    EventLog.getInstance().message = 'Waiting...';
    actor.onRest();
    actor.setNextAction(null);
  }
}
