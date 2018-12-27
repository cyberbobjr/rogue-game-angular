import {Iaction} from '../../interfaces/iaction';
import {Entity} from '../base/entity';
import {ActionResult} from './action-result';
import {EventLog} from '../event-log';
import {ChaseAction} from './chase-action';
import {GameEngineService} from '../../../modules/game/services/game-engine.service';

export class IdleAction implements Iaction {
  private _info = '';

  constructor(private _actor: Entity) {
  }

  execute(actor: Entity, gameEngine: GameEngineService): ActionResult {
    if (actor.sprite.light) {
      EventLog.getInstance().message = 'Player in sight !';
      actor.setNextAction(new ChaseAction(actor));
    }
    return ActionResult.SUCCESS;
  }

  getInfo(): string {
    return this._info;
  }
}
