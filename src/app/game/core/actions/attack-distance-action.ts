import {Action} from '../../interfaces/action';
import {Entity} from '../base/entity';
import {ActionResult} from './action-result';
import {GameEngineImp} from '@services/game-engine-imp.service';
import {EventLog} from '../Utility/event-log';
import {CombatResolver} from '../../rules/combat/combat-resolver';
import {AbstractAction} from '@core/core/actions/AbstractAction';

export class AttackDistanceAction extends AbstractAction implements Action {
    private _info = '';

    getInfo(): string {
        return '';
    }

    execute(actor: Entity): ActionResult {
        EventLog.getInstance().message = `${actor.name} attack`;
        const damage: number = CombatResolver.DistanceAttack(actor, this._target);
        this._target.onHit(damage);
        return ActionResult.SUCCESS;
    }

}
