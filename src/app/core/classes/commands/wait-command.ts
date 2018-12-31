import {Command} from './command';
import {GameEngineService} from '../../../modules/game/services/game-engine.service';
import {Entity} from '../base/entity';
import {EventLog} from '../event-log';

export class WaitCommand implements Command {
  constructor() {
  }

  execute(actor: Entity, gameEngine: GameEngineService) {
    EventLog.getInstance().message = 'Waiting...';
    actor.setNextAction(null);
  }
}
