import {Action} from '../../interfaces/action';
import {Entity} from '../base/entity';
import {ActionResult} from './action-result';
import {GameEngine} from '../../../modules/game/services/game-engine.service';
import {EventLog} from '../Utility/event-log';
import {CombatResolver} from '../../rules/combat/combat-resolver';

export class AttackDistanceAction implements Action {
  private _info = '';

  constructor(private _target: Entity) {
  }

  getInfo(): string {
    return '';
  }

  execute(actor: Entity, gameEngine: GameEngine): ActionResult {
    EventLog.getInstance().message = `${actor.name} attack`;
    const damage: number = CombatResolver.DistanceAttack(actor, this._target);
    this._target.onHit(damage);
    return ActionResult.SUCCESS;
  }

}
