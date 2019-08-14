import {AbstractCommand, Command} from '../../interfaces/command';
import {GameEngineImp} from '../../../modules/game/services/game-engine-imp.service';
import {Entity} from '../base/entity';
import {OpenChestAction} from '../actions/open-chest-action';

export class OpenChestCommand  extends AbstractCommand implements Command {
  execute(actor: Entity) {
    actor.setNextAction(new OpenChestAction());
  }
}
