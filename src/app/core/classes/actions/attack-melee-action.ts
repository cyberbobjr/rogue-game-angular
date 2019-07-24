import {Iaction} from '../../interfaces/iaction';
import {Entity} from '../base/entity';
import {ActionResult} from './action-result';
import {EventLog} from '../event-log';
import {CombatResolver} from '../../rules/combat/combat-resolver';
import {GameEngine} from '../../../modules/game/services/game-engine.service';

export class AttackMeleeAction implements Iaction {
  private _info = '';

  constructor(private _target: Entity) {
  }

  execute(attacker: Entity, gameEngine: GameEngine): ActionResult {
    EventLog.getInstance().message = `${attacker.name} attack`;
    const damage: number = CombatResolver.HandToHandAttack(attacker, this._target);
    this._target.onHit(attacker, damage);
    return ActionResult.SUCCESS;
  }

  getInfo(): string {
    return this._info;
  }
}
