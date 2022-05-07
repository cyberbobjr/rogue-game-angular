import {Action} from '../../interfaces/action';
import {ActionResult} from './action-result';
import {MapEngine} from '../../../services/map-engine.service';
import {EventLog} from '../Utility/event-log';
import {Entity} from '../base/entity';
import {Tile} from '../base/tile';
import {GameEngineService} from '../../../services/game-engine-imp.service';

export class TakeAction implements Action {
  constructor() {
  }

  execute(actor: Entity, gameEngine: GameEngineService): ActionResult {
    const mapEngine: MapEngine = gameEngine.getMapEngine();
    const tile: Tile = mapEngine.getTileAt(actor.position) as Tile;
    EventLog.getInstance().message = 'Take object';
    tile.onTake(actor);
    return ActionResult.SUCCESS;
  }

  getInfo(): string {
    return '';
  }
}
