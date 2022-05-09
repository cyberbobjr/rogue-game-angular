import {Action} from '../../interfaces/action';
import {Entity} from '../base/entity';
import {ActionResult} from './action-result';
import {EventLog} from '../Utility/event-log';
import {MapEngine} from '@core/core/engines/map-engine';
import {Tile} from '../base/tile';
import {ChestTile} from '../tiles/chest-tile';
import {AbstractAction} from '@core/core/actions/AbstractAction';

export class OpenChestAction extends AbstractAction implements Action {
    execute(actor: Entity): ActionResult {
        const mapEngine: MapEngine = this._gameEngine.getMapEngine();
        const tile: Tile = mapEngine.getTileAt(actor.position);
        if (tile instanceof ChestTile) {
            EventLog.getInstance().message = 'You trying to open chest';
            tile.openChest();
            actor.setNextAction(null);
            return ActionResult.SUCCESS;
        } else {
            EventLog.getInstance().message = 'What ?!?!';
            actor.setNextAction(null);
            return ActionResult.SUCCESS;
        }
    }

    getInfo(): string {
        return '';
    }

}
