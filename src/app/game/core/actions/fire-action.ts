import {Action} from '../../interfaces/action';
import {Entity} from '../base/entity';
import {ActionResult} from './action-result';
import {EventLog} from '../Utility/event-log';
import {AttackDistanceAction} from './attack-distance-action';
import {ChooseTarget} from '../Utility/choose-target';
import {AbstractAction} from '@core/core/actions/AbstractAction';

export class FireAction extends AbstractAction implements Action {
    private _targets: Array<Entity> = [];
    private _actor: Entity;
    private _info = 'Fire action';
    private _chooseTarget: ChooseTarget;

    execute(actor: Entity): ActionResult {
        this._actor = actor;
        this._targets = this._gameEngine.getEntitiesVisibles();
        console.log('Targets :');
        console.log('=========');
        console.log(this._targets);
        if (this._targets.length === 0) {
            EventLog.getInstance().message = 'No target in range !';
            return ActionResult.SUCCESS;
        }
        this._chooseTarget = new ChooseTarget(this._gameEngine, {keyAction: 'KeyF'}, this._fire.bind(this));
        return ActionResult.WAIT;
    }

    getInfo(): string {
        return this._info;
    }

    private _fire(targets: Entity[]): void {
        console.log('Selected target : ' + targets[0]);
        if (targets) {
            this._actor.setNextAction(new AttackDistanceAction(targets[0], this._gameEngine));
        }
    }
}
