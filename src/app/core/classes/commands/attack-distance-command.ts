import {AbstractCommand, Command} from '../../interfaces/command';
import {Entity} from '../base/entity';
import {GameEngineImp} from '../../../modules/game/services/game-engine-imp.service';
import {FireAction} from '../actions/fire-action';

export class AttackDistanceCommand  extends AbstractCommand implements Command {
  execute(actor: Entity) {
    actor.setNextAction(new FireAction());
  }
}
