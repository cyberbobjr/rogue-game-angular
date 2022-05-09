import {Action} from '../../interfaces/action';
import {ActionResult} from './action-result';
import {MapEngine} from '@core/core/engines/map-engine';
import {EventLog} from '../Utility/event-log';
import {Entity} from '../base/entity';
import {Tile} from '../base/tile';
import {GameEngineImp} from '@services/game-engine-imp.service';
import {AbstractAction} from '@core/core/actions/AbstractAction';

export class TakeAction extends AbstractAction implements Action {

    execute(actor: Entity): ActionResult {
        const mapEngine: MapEngine = this._gameEngine.getMapEngine();
        const tile: Tile = mapEngine.getTileAt(actor.position) as Tile;
        EventLog.getInstance().message = 'Take object';
        tile.onTake(actor);
        return ActionResult.SUCCESS;
    }

    getInfo(): string {
        return '';
    }
}
