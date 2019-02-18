import {Command} from './command';
import {GameEngineService} from '../../../modules/game/services/game-engine.service';
import {Entity} from '../base/entity';
import {OpenChestAction} from '../actions/open-chest-action';

export class OpenChestCommand implements Command {
  execute(actor: Entity, gameEngine: GameEngineService) {
    actor.setNextAction(new OpenChestAction(actor));
  }
}
