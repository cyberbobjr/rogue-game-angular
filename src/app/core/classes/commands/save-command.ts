import {Command} from './command';
import {Entity} from '../base/entity';
import {GameEngine} from '../../../modules/game/services/game-engine.service';
import {EventLog} from '../event-log';

export class SaveCommand implements Command {
  execute(actor: Entity, gameEngine: GameEngine) {
    gameEngine.storageEngine.saveGameState(gameEngine.gameMap, gameEngine.gameEntities);
    EventLog.getInstance().message = 'Game saved!';
    actor.setNextAction(null);
  }
}
