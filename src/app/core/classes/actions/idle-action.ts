import {Iaction} from '../../interfaces/iaction';
import {Entity} from '../base/entity';
import {MapEngine} from '../../../modules/game/services/map-engine.service';
import {ActionResult} from './action-result';
import {EventLog} from '../event-log';
import {ChaseAction} from './chase-action';

export class IdleAction implements Iaction {
  private _info = '';

  constructor(private _mapEngine: MapEngine,
              private _actor: Entity) {
  }

  execute(actor: Entity, mapEngine: MapEngine): ActionResult {
    if (actor.sprite.light) {
      EventLog.getInstance().message = 'Player in sight !';
      actor.setNextAction(new ChaseAction(mapEngine, actor));
    }
    return ActionResult.SUCCESS;
  }

  getInfo(): string {
    return this._info;
  }
}
