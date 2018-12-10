import {Iaction} from '../../interfaces/iaction';
import {MapEngine} from '../../../modules/game/services/map-engine.service';
import {Entity} from '../base/entity';
import {ActionResult} from './action-result';
import {EventLog} from '../event-log';
import {CombatResolver} from '../../rules/combat/resolver';

export class AttackAction implements Iaction {
  private _info = '';

  constructor(private _mapEngine: MapEngine,
              private _target: Entity) {
  }

  execute(actor: Entity): ActionResult {
    EventLog.getInstance().message = 'Attack';
    let damage: number = CombatResolver.HandToHandAttack(actor, this._target);
    console.log(damage);
    this._target.onHit(actor);
    return ActionResult.SUCCESS;
  }

  getInfo(): string {
    return this._info;
  }
}
