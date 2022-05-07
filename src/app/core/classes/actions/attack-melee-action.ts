import {Action} from '../../interfaces/action';
import {Entity} from '../base/entity';
import {ActionResult} from './action-result';
import {EventLog} from '../Utility/event-log';
import {CombatResolver} from '../../rules/combat/combat-resolver';
import {GameEngineService} from '../../../services/game-engine-imp.service';

export class AttackMeleeAction implements Action {
  private _info = '';

  constructor(private _target: Entity) {
  }

  execute(actor: Entity, gameEngine: GameEngineService): ActionResult {
    EventLog.getInstance().message = `${actor.name} attack`;
    const damage: number = CombatResolver.HandToHandAttack(actor, this._target);
    this._target.onHit(damage);
    return ActionResult.SUCCESS;
  }

  getInfo(): string {
    return this._info;
  }
}
