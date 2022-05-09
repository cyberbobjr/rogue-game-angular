import {Action} from '../../interfaces/action';
import {Entity} from '../base/entity';
import {ActionResult} from './action-result';
import {EventLog} from '../Utility/event-log';
import {CombatResolver} from '../../rules/combat/combat-resolver';
import {AbstractAction} from '@core/core/actions/AbstractAction';

export class AttackMeleeAction extends AbstractAction implements Action {
    private _info = '';

    execute(actor: Entity): ActionResult {
        EventLog.getInstance().message = `${actor.name} attack`;
        const damage: number = CombatResolver.HandToHandAttack(actor, this._target);
        this._target.onHit(damage);
        return ActionResult.SUCCESS;
    }

    getInfo(): string {
        return this._info;
    }
}
