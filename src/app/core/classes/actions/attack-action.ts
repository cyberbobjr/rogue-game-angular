import {Iaction} from '../../interfaces/iaction';
import {MapEngine} from '../../../modules/game/services/map-engine.service';
import {Entity} from '../base/entity';
import {ActionResult} from './action-result';
import {EventLog} from '../event-log';
import {CombatResolver} from '../../rules/combat/combat-resolver';

export class AttackAction implements Iaction {
  private _info = '';

  constructor(private _target: Entity,
              private _mapEngine: MapEngine) {
  }

  execute(actor: Entity): ActionResult {
    EventLog.getInstance().message = 'Attack';
    const damage: number = CombatResolver.HandToHandAttack(actor, this._target);
    this._target.onHit(actor, damage);
    return ActionResult.SUCCESS;
  }

  getInfo(): string {
    return this._info;
  }
}
