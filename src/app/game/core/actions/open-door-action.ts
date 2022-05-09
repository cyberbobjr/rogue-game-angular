import {Action} from '../../interfaces/action';
import {Entity} from '../base/entity';
import {ActionResult} from './action-result';
import {DoorTile} from '../tiles/door-tile';
import {EventLog} from '../Utility/event-log';
import {AbstractAction} from '@core/core/actions/AbstractAction';

export class OpenDoorAction extends AbstractAction implements Action {
    private _info = '';

    execute(actor: Entity): ActionResult {
        EventLog.getInstance().message = 'You trying to open door';
        (this._target as unknown as DoorTile).flipDoor();
        actor.setNextAction(null);
        return ActionResult.SUCCESS;
    }

    getInfo(): string {
        return this._info;
    }
}
