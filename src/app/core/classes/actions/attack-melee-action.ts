import {Iaction} from '../../interfaces/iaction';
import {Entity} from '../base/entity';
import {ActionResult} from './action-result';
import {EventLog} from '../event-log';
import {CombatResolver} from '../../rules/combat/combat-resolver';
import {GameEngineService} from '../../../modules/game/services/game-engine.service';

export class AttackMeleeAction implements Iaction {
  private _info = '';

  constructor(private _target: Entity) {
  }

  execute(actor: Entity, gameEngine: GameEngineService): ActionResult {
    EventLog.getInstance().message = `${actor.name} attack`;
    const damage: number = CombatResolver.HandToHandAttack(actor, this._target);
    this._target.onHit(actor, damage);
    return ActionResult.SUCCESS;
  }

  getInfo(): string {
    return this._info;
  }
}
