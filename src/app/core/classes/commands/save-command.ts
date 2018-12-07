import {Command} from './command';
import {Entity} from '../base/entity';
import {GameEngineService} from '../../../modules/game/services/game-engine.service';
import {EventLog} from '../event-log';

export class SaveCommand implements Command {
  execute(actor: Entity, gameEngine: GameEngineService) {
    gameEngine.storageEngine.saveGameState();
    EventLog.getInstance().message = 'Game saved!';
    actor.setNextAction(null);
  }
}
